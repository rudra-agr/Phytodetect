import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";
import { Language } from "../types";

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
  compact?: boolean;
}

const options: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ne", label: "ने" },
];

export function LanguageSelector({ language, onChange, compact = false }: LanguageSelectorProps) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {options.map((option) => {
        const isActive = option.code === language;
        return (
          <Pressable
            key={option.code}
            onPress={() => onChange(option.code)}
            accessibilityRole="button"
            accessibilityLabel={`Switch language to ${option.label}`}
            style={[styles.option, isActive && styles.optionActive, compact && styles.compactOption]}
          >
            <Text style={[styles.optionText, isActive && styles.optionTextActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primarySurface,
    borderRadius: radius.pill,
    padding: 4,
  },
  compactContainer: { padding: 2 },
  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  compactOption: { paddingVertical: 6, paddingHorizontal: spacing.sm },
  optionActive: { backgroundColor: colors.primary },
  optionText: { ...typography.caption, color: colors.primaryDark, fontWeight: "700" },
  optionTextActive: { color: colors.white },
});
