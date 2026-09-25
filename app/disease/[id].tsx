import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { colors, spacing, typography } from "../../src/theme";
import { ScreenHeader, SectionCard, EmptyState } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { findDiseaseById, getDiseases } from "../../src/data/diseases";
import { translateCropLabel } from "../../src/utils/labels";

export default function DiseaseInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, language } = useTranslation();
  const disease = findDiseaseById(id || "", language) || getDiseases(language)[0];

  if (!disease) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState title={t.errorGeneric} description="" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={disease.name} subtitle={translateCropLabel(disease.crop, t)} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overviewCard}>
          <Text style={styles.overviewLabel}>{t.diseaseOverview}</Text>
          <Text style={styles.overviewText}>{disease.overview}</Text>
        </View>

        <SectionCard title={t.symptoms} items={disease.symptoms} initiallyExpanded accentColor={colors.warning} />
        <SectionCard title={t.causes} items={disease.cause} />
        <SectionCard title={t.treatment} items={disease.treatment} accentColor={colors.primary} />
        <SectionCard title={t.pesticideOptions} items={disease.pesticide} />
        <SectionCard title={t.organicTreatment} items={disease.organicTreatment} />
        <SectionCard title={t.prevention} items={disease.prevention} />
        <SectionCard title={t.fertilizerSuggestions} items={disease.fertilizer} />
        <SectionCard title={t.cropCareSection} items={disease.cropCare} />

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
