import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";
import { toPercentage } from "../utils/formatUtils";

interface ConfidenceBarProps {
  confidence: number;
  label?: string;
}

function getColor(confidence: number): string {
  const value = confidence <= 1 ? confidence * 100 : confidence;
  if (value >= 80) return colors.success;
  if (value >= 50) return colors.warning;
  return colors.danger;
}

export function ConfidenceBar({ confidence, label }: ConfidenceBarProps) {
  const value = confidence <= 1 ? confidence * 100 : confidence;
  const barColor = getColor(confidence);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label || "Confidence"}</Text>
        <Text style={[styles.value, { color: barColor }]}>{toPercentage(confidence)}</Text>
      </View>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(value) }}
      >
        <View style={[styles.fill, { width: `${Math.min(value, 100)}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: { ...typography.caption, color: colors.textSecondary },
  value: { ...typography.bodyBold },
  track: {
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.earthLight,
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: radius.pill },
});
