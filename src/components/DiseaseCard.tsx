import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AppCard } from "./AppCard";
import { colors, radius, spacing, typography } from "../theme";
import { toPercentage, formatDate } from "../utils/formatUtils";

interface DiseaseCardProps {
  disease: string;
  crop: string;
  confidence: number;
  imageUri?: string;
  date?: string;
  onPress?: () => void;
}

export function DiseaseCard({ disease, crop, confidence, imageUri, date, onPress }: DiseaseCardProps) {
  return (
    <AppCard onPress={onPress} style={styles.card} accessibilityLabel={`${disease}, ${crop}`}>
      <View style={styles.row}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumbnail} accessibilityLabel="Crop leaf image" />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
        )}
        <View style={styles.details}>
          <Text style={styles.crop}>{crop}</Text>
          <Text style={styles.disease} numberOfLines={2}>
            {disease}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.confidence}>{toPercentage(confidence)}</Text>
            {date ? <Text style={styles.date}>{formatDate(date)}</Text> : null}
          </View>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.md },
  row: { flexDirection: "row", alignItems: "center" },
  thumbnail: { width: 64, height: 64, borderRadius: radius.md, marginRight: spacing.md },
  thumbnailPlaceholder: { backgroundColor: colors.primarySurface },
  details: { flex: 1 },
  crop: { ...typography.caption, color: colors.textMuted, textTransform: "uppercase" },
  disease: { ...typography.subtitle, color: colors.textPrimary, marginTop: 2 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xs },
  confidence: { ...typography.bodyBold, color: colors.primaryDark },
  date: { ...typography.caption, color: colors.textMuted },
});
