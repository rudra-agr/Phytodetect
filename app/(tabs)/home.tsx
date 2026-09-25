import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { colors, radius, spacing, typography } from "../../src/theme";
import {
  AppButton,
  AppCard,
  DiseaseCard,
  LanguageSelector,
  QuickActionCard,
} from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { useHistory } from "../../src/hooks/useHistory";
import { getTips } from "../../src/data/tips";
import { translateCropLabel } from "../../src/utils/labels";

export default function HomeScreen() {
  const { t, language, setLanguage } = useTranslation();
  const { items, reload } = useHistory();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }, [reload]);

  const recent = items.slice(0, 3);
  const tips = getTips(language);
  const dailyTip = tips[new Date().getDate() % tips.length];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{t.appName}</Text>
            <Text style={styles.greeting}>{t.greeting}</Text>
          </View>
          <LanguageSelector language={language} onChange={setLanguage} compact />
        </View>

        <Text style={styles.subtitle}>{t.homeSubtitle}</Text>

        <AppCard style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <Text style={styles.heroIconText}>🌿</Text>
          </View>
          <Text style={styles.heroTitle}>{t.detectDiseaseTitle}</Text>
          <Text style={styles.heroDesc}>{t.detectDiseaseDesc}</Text>
          <AppButton label={t.scanLeaf} onPress={() => router.push("/(tabs)/scan")} />
        </AppCard>

        <Text style={styles.sectionTitle}>{t.quickActions}</Text>
        <View style={styles.quickActionsRow}>
          <QuickActionCard
            label={t.history}
            icon={<Text style={styles.quickActionIcon}>🕘</Text>}
            onPress={() => router.push("/(tabs)/history")}
          />
          <QuickActionCard
            label={t.cropCare}
            icon={<Text style={styles.quickActionIcon}>🌾</Text>}
            onPress={() => router.push("/crop")}
          />
          <QuickActionCard
            label={t.assistant}
            icon={<Text style={styles.quickActionIcon}>💬</Text>}
            onPress={() => router.push("/(tabs)/assistant")}
          />
          <QuickActionCard
            label={t.tips}
            icon={<Text style={styles.quickActionIcon}>💡</Text>}
            onPress={() => router.push("/(tabs)/assistant")}
          />
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>{t.recentDetections}</Text>
        </View>

        {recent.length === 0 ? (
          <AppCard style={styles.emptyRecentCard}>
            <Text style={styles.emptyRecentText}>{t.noRecentDetections}</Text>
          </AppCard>
        ) : (
          <FlatList
            data={recent}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DiseaseCard
                disease={item.disease}
                crop={translateCropLabel(item.crop, t)}
                confidence={item.confidence}
                imageUri={item.imageUri}
                date={item.createdAt}
                onPress={() => router.push(`/result/${item.id}`)}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
          />
        )}

        <Text style={styles.sectionTitle}>{t.farmerTips}</Text>
        <AppCard>
          <Text style={styles.tipTitle}>{dailyTip.title}</Text>
          <Text style={styles.tipDescription}>{dailyTip.description}</Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: spacing.sm,
  },
  brand: { ...typography.h3, color: colors.primaryDark },
  greeting: { ...typography.h2, color: colors.textPrimary, marginTop: 2 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.lg },
  heroCard: { alignItems: "center", marginBottom: spacing.xl, backgroundColor: colors.primarySurface, borderColor: colors.primarySurface },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  heroIconText: { fontSize: 30 },
  heroTitle: { ...typography.h3, color: colors.primaryDark, marginBottom: spacing.xs, textAlign: "center" },
  heroDesc: { ...typography.body, color: colors.textSecondary, textAlign: "center", marginBottom: spacing.lg },
  sectionTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.md, marginTop: spacing.sm },
  sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  quickActionsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  quickActionIcon: { fontSize: 20 },
  emptyRecentCard: { marginBottom: spacing.lg },
  emptyRecentText: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
  tipTitle: { ...typography.subtitle, color: colors.textPrimary, marginBottom: spacing.xs },
  tipDescription: { ...typography.body, color: colors.textSecondary },
});
