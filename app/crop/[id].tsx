import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { colors, spacing, typography } from "../../src/theme";
import { ScreenHeader, SectionCard, EmptyState } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { findCropById, getCrops } from "../../src/data/crops";

export default function CropDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, language } = useTranslation();
  const crop = findCropById(id || "", language) || getCrops(language)[0];

  if (!crop) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title={t.errorGeneric} description="" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={crop.name} subtitle={t.cropCareTitle} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>{t.overview}</Text>
          <Text style={styles.overviewText}>{crop.overview}</Text>
        </View>

        <SectionCard title={t.watering} items={[crop.watering]} initiallyExpanded accentColor={colors.info} />
        <SectionCard title={t.fertilizer} items={[crop.fertilizer]} accentColor={colors.primary} />
        <SectionCard title={t.diseaseRisks} items={crop.commonDiseaseRisks} accentColor={colors.warning} />
        <SectionCard title={t.prevention} items={crop.prevention} />
        <SectionCard title={t.generalCare} items={crop.generalCare} />

        <Text style={styles.disclaimer}>{t.disclaimerNote}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  overviewCard: { marginBottom: spacing.lg },
  overviewLabel: { ...typography.caption, color: colors.textMuted, textTransform: "uppercase", marginBottom: spacing.xs },
  overviewText: { ...typography.body, color: colors.textPrimary },
  disclaimer: { ...typography.caption, color: colors.textMuted, textAlign: "center", marginVertical: spacing.lg },
});
