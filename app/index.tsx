import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { colors, spacing, typography } from "../src/theme";
import { isOnboardingComplete } from "../src/storage/settingsStorage";
import { useTranslation } from "../src/i18n";

export default function SplashScreen() {
  const { t, isLoading } = useTranslation();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(async () => {
      const completed = await isOnboardingComplete();
      router.replace(completed ? "/(tabs)/home" : "/onboarding");
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoEmoji}>🌿</Text>
      </View>
      <Text style={styles.appName}>{t.appName}</Text>
      <Text style={styles.tagline}>{t.appSubtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primarySurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoEmoji: { fontSize: 44 },
  appName: { ...typography.h1, color: colors.primaryDark },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
