import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "./AppButton";
import { colors, radius, spacing, typography } from "../theme";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({ title, message, onRetry, retryLabel }: ErrorStateProps) {
  return (
    <View style={styles.container} accessibilityLiveRegion="assertive">
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>!</Text>
      </View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <View style={styles.buttonWrap}>
          <AppButton label={retryLabel || "Retry"} onPress={onRetry} variant="outline" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", padding: spacing.xxl },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  iconText: { color: colors.danger, fontSize: 28, fontWeight: "700" },
  title: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.xs, textAlign: "center" },
  message: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
  buttonWrap: { marginTop: spacing.lg, minWidth: 160 },
});
