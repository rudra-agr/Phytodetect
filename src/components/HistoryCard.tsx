import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";
import { toPercentage, formatDate } from "../utils/formatUtils";

interface HistoryCardProps {
  crop: string;
  disease: string;
  confidence: number;
  date: string;
  imageUri?: string;
  onPress: () => void;
  onDelete: () => void;
  deleteLabel: string;
}

export function HistoryCard({
  crop,
  disease,
  confidence,
  date,
  imageUri,
  onPress,
  onDelete,
  deleteLabel,
}: HistoryCardProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.pressableArea}
        accessibilityRole="button"
        accessibilityLabel={`${disease}, ${crop}, ${toPercentage(confidence)}, ${formatDate(date)}`}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
        )}
        <View style={styles.details}>
          <Text style={styles.crop}>{crop}</Text>
          <Text style={styles.disease} numberOfLines={1}>
            {disease}
          </Text>
          <Text style={styles.meta}>
            {toPercentage(confidence)} · {formatDate(date)}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={onDelete}
        style={styles.deleteButton}
        accessibilityRole="button"
        accessibilityLabel={deleteLabel}
        hitSlop={10}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  pressableArea: { flexDirection: "row", flex: 1, alignItems: "center" },
  thumbnail: { width: 56, height: 56, borderRadius: radius.md, marginRight: spacing.md },
  thumbnailPlaceholder: { backgroundColor: colors.primarySurface },
  details: { flex: 1 },
  crop: { ...typography.caption, color: colors.textMuted, textTransform: "uppercase" },
  disease: { ...typography.subtitle, color: colors.textPrimary, marginTop: 2 },
  meta: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSurface,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: spacing.sm,
  },
  deleteText: { color: colors.danger, fontWeight: "700" },
});
