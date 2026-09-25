import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { colors, radius, spacing, typography } from "../../src/theme";
import { AppButton, ImagePickerCard, LoadingState, ScreenHeader } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import {
  isSupportedImage,
  compressImage,
  isFileSizeAcceptable,
  persistImage,
} from "../../src/utils/imageUtils";
import { predictDisease } from "../../src/services/predictionService";
import { predictionCache } from "../../src/services/predictionCache";
import { USE_MOCK_API } from "../../src/services/api";
import { useNetworkStatus } from "../../src/hooks/useNetworkStatus";
import { ApiError } from "../../src/types";

type ScreenState = "idle" | "loading" | "error";

export default function ScanScreen() {
  const { t } = useTranslation();
  const { status: networkStatus } = useNetworkStatus();
  const { capturedUri, capturedAt } = useLocalSearchParams<{
    capturedUri?: string;
    capturedAt?: string;
  }>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [state, setState] = useState<ScreenState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const lastHandledCaptureRef = useRef<string | undefined>(undefined);

  // Picks up a photo handed back from the in-app camera screen (app/camera.tsx).
  useEffect(() => {
    if (capturedUri && capturedAt && lastHandledCaptureRef.current !== capturedAt) {
      lastHandledCaptureRef.current = capturedAt;
      applySelectedImage(capturedUri);
      router.setParams({ capturedUri: undefined, capturedAt: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedUri, capturedAt]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setState("idle");
        setImageUri(null);
        setErrorMessage("");
      };
    }, [])
  );

  const resetImage = useCallback(() => {
    setImageUri(null);
    setState("idle");
    setErrorMessage("");
  }, []);

  const handlePermissionDenied = (type: "camera" | "gallery") => {
    Alert.alert(
      t.permissionDeniedTitle,
      type === "camera" ? t.permissionDeniedCamera : t.permissionDeniedGallery,
      [
        { text: t.cancel, style: "cancel" },
        { text: t.openSettings, onPress: () => Linking.openSettings() },
      ]
    );
  };

  const applySelectedImage = async (uri: string) => {
    if (!isSupportedImage(uri)) {
      setErrorMessage(t.errorInvalidImage);
      setState("error");
      return;
    }
    const sizeOk = await isFileSizeAcceptable(uri);
    if (!sizeOk) {
      setErrorMessage(t.errorImageTooLarge);
      setState("error");
      return;
    }
    setImageUri(uri);
    setState("idle");
    setErrorMessage("");
  };

  const handleTakePhoto = () => {
    // Uses the in-app camera screen (expo-camera) instead of ImagePicker.launchCameraAsync.
    // On desktop/web browsers, ImagePicker's camera launcher falls back to the plain file
    // picker (browsers largely ignore the file input's "capture" attribute), which looked
    // like it was opening the gallery instead of the camera. expo-camera's CameraView uses
    // getUserMedia on web to show a real live camera preview, matching native behavior.
    router.push("/camera");
  };

  const handlePickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      handlePermissionDenied("gallery");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      await applySelectedImage(result.assets[0].uri);
    }
  };

  const handleScan = async () => {
    if (!imageUri) {
      setErrorMessage(t.errorInvalidImage);
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");
    try {
      const compressedUri = await compressImage(imageUri);
      const persistedUri = await persistImage(compressedUri);
      const prediction = await predictDisease(persistedUri);
      predictionCache.set(prediction);
      router.push(`/result/${prediction.id}`);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? (t as Record<string, string>)[error.message] || t.errorGeneric
          : t.errorGeneric;
      setErrorMessage(message);
      setState("error");
    }
  };

  const showOfflineBanner = !USE_MOCK_API && networkStatus === "offline";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={t.scanLeaf} subtitle={t.selectImagePrompt} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {state === "loading" ? (
          <View style={styles.loadingWrap}>
            <LoadingState message={t.analyzingCrop} />
          </View>
        ) : (
          <>
            {showOfflineBanner ? (
              <View style={styles.offlineBanner}>
                <Text style={styles.offlineBannerText}>{t.offlineBanner}</Text>
              </View>
            ) : null}

            <ImagePickerCard
              imageUri={imageUri}
              onTakePhoto={handleTakePhoto}
              onPickFromGallery={handlePickFromGallery}
              onRemove={resetImage}
              takePhotoLabel={t.takePhoto}
              uploadLabel={t.uploadFromGallery}
              removeLabel={t.remove}
              promptText={t.selectImagePrompt}
            />

            {state === "error" ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerTitle}>{t.errorNetworkTitle}</Text>
                <Text style={styles.errorBannerMessage}>{errorMessage}</Text>
              </View>
            ) : null}

            {imageUri ? (
              <View style={styles.buttonGroup}>
                <AppButton
                  label={state === "error" ? t.retry : t.scanDetect}
                  onPress={handleScan}
                />
                <View style={{ height: spacing.md }} />
                <AppButton label={t.retake} onPress={resetImage} variant="outline" />
              </View>
            ) : null}
          </>
        )}

        <Text style={styles.disclaimer}>{t.disclaimerNote}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  loadingWrap: { paddingVertical: spacing.xxxl },
  buttonGroup: { marginTop: spacing.xl },
  offlineBanner: {
    backgroundColor: colors.warningSurface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  offlineBannerText: { ...typography.caption, color: colors.warning },
  errorBanner: {
    backgroundColor: colors.dangerSurface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  errorBannerTitle: { ...typography.bodyBold, color: colors.danger, marginBottom: spacing.xs },
  errorBannerMessage: { ...typography.body, color: colors.danger },
  disclaimer: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
