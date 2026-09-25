import React, { useRef, useState } from "react";
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { colors, radius, spacing, typography } from "../src/theme";
import { useTranslation } from "../src/i18n";

export default function CameraScreen() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const handleClose = () => {
    router.back();
  };

  const handleFlip = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleCapture = async () => {
    if (!cameraRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: Platform.OS !== "web",
      });
      if (photo?.uri) {
        router.replace({
          pathname: "/(tabs)/scan",
          params: { capturedUri: photo.uri, capturedAt: String(Date.now()) },
        });
      }
    } catch (e) {
      Alert.alert(t.errorNetworkTitle, t.errorGeneric);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer} edges={["top", "bottom"]}>
        <Text style={styles.permissionIcon}>📷</Text>
        <Text style={styles.permissionTitle}>{t.permissionDeniedTitle}</Text>
        <Text style={styles.permissionMessage}>{t.permissionDeniedCamera}</Text>
        <View style={styles.permissionButtons}>
          {permission.canAskAgain ? (
            <Pressable style={styles.primaryButton} onPress={requestPermission}>
              <Text style={styles.primaryButtonText}>{t.takePhoto}</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.primaryButton}
              onPress={() => (Platform.OS === "web" ? handleClose() : Linking.openSettings())}
            >
              <Text style={styles.primaryButtonText}>
                {Platform.OS === "web" ? t.cancel : t.openSettings}
              </Text>
            </Pressable>
          )}
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryButtonText}>{t.cancel}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <SafeAreaView style={styles.overlay} edges={["top", "bottom"]}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton} onPress={handleClose} accessibilityLabel={t.cancel}>
            <Text style={styles.iconButtonText}>✕</Text>
          </Pressable>
          <Pressable style={styles.iconButton} onPress={handleFlip} accessibilityLabel={t.retake}>
            <Text style={styles.iconButtonText}>🔄</Text>
          </Pressable>
        </View>
        <View style={styles.bottomBar}>
          <Pressable
            style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]}
            onPress={handleCapture}
            disabled={isCapturing}
            accessibilityRole="button"
            accessibilityLabel={t.scanLeaf}
          >
            <View style={styles.captureButtonInner} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  bottomBar: {
    alignItems: "center",
    paddingBottom: spacing.xxl,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonText: { fontSize: 20, color: colors.white },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonDisabled: { opacity: 0.6 },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  permissionIcon: { fontSize: 48, marginBottom: spacing.md },
  permissionTitle: { ...typography.bodyBold, color: colors.textPrimary, marginBottom: spacing.sm },
  permissionMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  permissionButtons: { width: "100%" },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  primaryButtonText: { ...typography.button, color: colors.white },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  secondaryButtonText: { ...typography.button, color: colors.primary },
});
