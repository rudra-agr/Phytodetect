import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

type Variant = "primary" | "secondary" | "outline" | "danger";

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  accessibilityLabel?: string;
}

export function AppButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
  accessibilityLabel,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant].container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={variantStyles[variant].text.color} />
        ) : (
          <>
            {icon}
            <Text style={[styles.label, variantStyles[variant].text, icon ? styles.labelWithIcon : null]}>
              {label}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidth: { width: "100%" },
  content: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  label: { ...typography.button },
  labelWithIcon: { marginLeft: spacing.sm },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
});

const variantStyles: Record<Variant, { container: object; text: { color: string } }> = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.white },
  },
  secondary: {
    container: { backgroundColor: colors.primarySurface },
    text: { color: colors.primaryDark },
  },
  outline: {
    container: { backgroundColor: colors.background, borderWidth: 1.5, borderColor: colors.primary },
    text: { color: colors.primary },
  },
  danger: {
    container: { backgroundColor: colors.danger },
    text: { color: colors.white },
  },
};
