import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

interface ImagePickerCardProps {
  imageUri: string | null;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  onRemove: () => void;
  takePhotoLabel: string;
  uploadLabel: string;
  removeLabel: string;
  promptText: string;
}

export function ImagePickerCard({
  imageUri,
  onTakePhoto,
  onPickFromGallery,
  onRemove,
  takePhotoLabel,
  uploadLabel,
  removeLabel,
  promptText,
}: ImagePickerCardProps) {
  if (imageUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: imageUri }} style={styles.previewImage} accessibilityLabel="Selected leaf image" />
        <Pressable
          onPress={onRemove}
          style={styles.removeButton}
          accessibilityRole="button"
          accessibilityLabel={removeLabel}
        >
          <Text style={styles.removeButtonText}>{removeLabel}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.placeholder}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🌿</Text>
      </View>
      <Text style={styles.promptText}>{promptText}</Text>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={onTakePhoto}
          style={[styles.actionButton, styles.primaryAction]}
          accessibilityRole="button"
          accessibilityLabel={takePhotoLabel}
        >
          <Text style={styles.primaryActionText}>{takePhotoLabel}</Text>
        </Pressable>
        <Pressable
          onPress={onPickFromGallery}
          style={[styles.actionButton, styles.secondaryAction]}
          accessibilityRole="button"
          accessibilityLabel={uploadLabel}
        >
          <Text style={styles.secondaryActionText}>{uploadLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  iconText: { fontSize: 28 },
  promptText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  buttonRow: { flexDirection: "row", width: "100%" },
  actionButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.xs,
  },
  primaryAction: { backgroundColor: colors.primary },
  primaryActionText: { ...typography.button, color: colors.white },
  secondaryAction: { backgroundColor: colors.background, borderWidth: 1.5, borderColor: colors.primary },
  secondaryActionText: { ...typography.button, color: colors.primary },
  previewContainer: { alignItems: "center" },
  previewImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  removeButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.dangerSurface,
  },
  removeButtonText: { ...typography.bodyBold, color: colors.danger },
});
