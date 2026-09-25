import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

interface QuickActionCardProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export function QuickActionCard({ label, icon, onPress }: QuickActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.md,
    minHeight: 96,
    justifyContent: "center",
  },
  pressed: { opacity: 0.85 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  label: { ...typography.bodyBold, color: colors.textPrimary },
});
