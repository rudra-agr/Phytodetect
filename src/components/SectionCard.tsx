import React, { useState } from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SectionCardProps {
  title: string;
  items: string[];
  initiallyExpanded?: boolean;
  accentColor?: string;
}

export function SectionCard({ title, items, initiallyExpanded = false, accentColor }: SectionCardProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  if (!items || items.length === 0) return null;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggle}
        style={styles.header}
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${expanded ? "expanded" : "collapsed"}`}
      >
        <View style={[styles.accent, accentColor ? { backgroundColor: accentColor } : null]} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.chevron}>{expanded ? "\u2212" : "+"}</Text>
      </Pressable>
      {expanded && (
        <View style={styles.body}>
          {items.map((item, index) => (
            <View style={styles.itemRow} key={`${title}-${index}`}>
              <View style={styles.bullet} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  accent: { width: 4, height: 20, borderRadius: 2, backgroundColor: colors.primary, marginRight: spacing.md },
  title: { ...typography.subtitle, color: colors.textPrimary, flex: 1 },
  chevron: { ...typography.h3, color: colors.textSecondary, width: 24, textAlign: "center" },
  body: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  itemRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: spacing.sm },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.sm,
  },
  itemText: { ...typography.body, color: colors.textSecondary, flex: 1 },
});
