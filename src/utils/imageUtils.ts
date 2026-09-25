import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";

const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic"];
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;
const PERSIST_DIRECTORY = `${FileSystem.documentDirectory || ""}phytodetect-leaves/`;

function getExtensionFromUri(uri: string): string | null {
  const lastSegment = uri.split("/").pop() || "";
  const withoutQuery = lastSegment.split("?")[0];
  const dotIndex = withoutQuery.lastIndexOf(".");
  if (dotIndex === -1) return null;
  const extension = withoutQuery.slice(dotIndex + 1).toLowerCase();
  if (!extension || extension.length > 5) return null;
  return extension;
}

export function isSupportedImage(uri: string): boolean {
  const extension = getExtensionFromUri(uri);
  if (!extension) return true;
  return SUPPORTED_EXTENSIONS.includes(extension);
}

export function getFileNameFromUri(uri: string): string {
  const extension = getExtensionFromUri(uri);
  if (extension) {
    const lastSegment = (uri.split("/").pop() || "").split("?")[0];
    if (lastSegment) return lastSegment;
  }
  return `leaf_${Date.now()}.jpg`;
}

export function getMimeTypeFromUri(uri: string): string {
  const extension = getExtensionFromUri(uri);
  switch (extension) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    default:
      return "image/jpeg";
  }
}

export async function compressImage(uri: string): Promise<string> {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1024 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  } catch (e) {
    return uri;
  }
}

export async function isFileSizeAcceptable(uri: string): Promise<boolean> {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists || typeof info.size !== "number") return true;
    return info.size <= MAX_FILE_SIZE_BYTES;
  } catch (e) {
    return true;
  }
}

export async function persistImage(uri: string): Promise<string> {
  if (!FileSystem.documentDirectory) return uri;
  try {
    const dirInfo = await FileSystem.getInfoAsync(PERSIST_DIRECTORY);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(PERSIST_DIRECTORY, { intermediates: true });
    }
    const fileName = `leaf_${Date.now()}_${Math.floor(Math.random() * 100000)}.jpg`;
    const destination = `${PERSIST_DIRECTORY}${fileName}`;
    await FileSystem.copyAsync({ from: uri, to: destination });
    return destination;
  } catch (e) {
    return uri;
  }
}
