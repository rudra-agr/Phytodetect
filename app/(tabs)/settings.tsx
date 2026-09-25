import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { colors, radius, spacing, typography } from "../../src/theme";
import { AppCard, LanguageSelector, ScreenHeader } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { historyRepository } from "../../src/storage/historyStorage";
import { checkApiHealth, API_URL, USE_MOCK_API } from "../../src/services/api";

type ApiStatus = "checking" | "connected" | "disconnected";

export default function SettingsScreen() {
  const { t, language, setLanguage } = useTranslation();
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    (async () => {
      const healthy = await checkApiHealth();
      setApiStatus(healthy ? "connected" : "disconnected");
    })();
  }, []);

  const handleClearHistory = () => {
    Alert.alert(t.clearHistory, t.clearHistoryConfirm, [
      { text: t.cancel, style: "cancel" },
      { text: t.confirm, style: "destructive", onPress: () => historyRepository.clear() },
    ]);
  };

  const statusLabel =
    apiStatus === "checking" ? t.checkingStatus : apiStatus === "connected" ? t.connected : t.disconnected;
  const statusColor =
    apiStatus === "checking" ? colors.textMuted : apiStatus === "connected" ? colors.success : colors.danger;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={t.settingsTitle} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.language}</Text>
          <LanguageSelector language={language} onChange={setLanguage} />
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.notifications}</Text>
          <Text style={styles.rowValue}>{t.notificationsComingSoon}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.apiStatus}</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.rowValue, { color: statusColor }]}>{statusLabel}</Text>
          </View>
          <Text style={styles.apiUrl}>{API_URL}</Text>
          {USE_MOCK_API ? <Text style={styles.mockBadge}>{t.mockModeActive}</Text> : null}
        </AppCard>

        <AppCard onPress={handleClearHistory} style={styles.card}>
          <Text style={[styles.rowLabel, styles.dangerText]}>{t.clearHistory}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.aboutApp}</Text>
          <Text style={styles.rowValue}>{t.aboutAppDesc}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.privacy}</Text>
          <Text style={styles.rowValue}>{t.privacyDesc}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.rowLabel}>{t.appVersion}</Text>
          <Text style={styles.rowValue}>{Constants.expoConfig?.version || "1.0.0"}</Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  card: { marginBottom: spacing.md },
  rowLabel: { ...typography.subtitle, color: colors.textPrimary, marginBottom: spacing.sm },
  rowValue: { ...typography.body, color: colors.textSecondary },
  dangerText: { color: colors.danger, marginBottom: 0 },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.xs },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.sm },
  apiUrl: { ...typography.caption, color: colors.textMuted },
  mockBadge: {
    ...typography.caption,
    color: colors.primaryDark,
    backgroundColor: colors.primarySurface,
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
});
