import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { colors, radius, spacing, typography } from "../../src/theme";
import { AppButton, ConfidenceBar, SectionCard } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { predictionCache } from "../../src/services/predictionCache";
import { historyRepository } from "../../src/storage/historyStorage";
import { resolvePredictionDisplay } from "../../src/utils/predictionDisplay";
import { translateCropLabel } from "../../src/utils/labels";
import { DiseasePrediction } from "../../src/types";

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, language } = useTranslation();
  const [prediction, setPrediction] = useState<DiseasePrediction | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }
      const cached = predictionCache.get(id);
      if (cached) {
        setPrediction(cached);
        setIsLoading(false);
        return;
      }
      const historyItem = await historyRepository.getById(id);
      if (historyItem) {
        setPrediction(historyItem.prediction);
        setIsSaved(true);
      }
      setIsLoading(false);
    })();
  }, [id]);

  const handleSave = async () => {
    if (!prediction) return;
    await historyRepository.add(prediction);
    setIsSaved(true);
    Alert.alert(t.savedToHistory);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.notFoundText}>{t.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!prediction) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text style={styles.notFoundText}>{t.errorGeneric}</Text>
          <AppButton label={t.backToHome} onPress={() => router.replace("/(tabs)/home")} />
        </View>
      </SafeAreaView>
    );
  }

  const display = resolvePredictionDisplay(prediction, language, t.overviewUnavailable);
  const cropLabel = translateCropLabel(prediction.crop, t);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: prediction.imageUri }} style={styles.image} accessibilityLabel="Scanned crop leaf" />

        <View style={styles.summary}>
          <Text style={styles.cropLabel}>{cropLabel}</Text>
          <Text style={styles.diseaseName}>{prediction.disease}</Text>
          <View style={{ marginTop: spacing.md }}>
            <ConfidenceBar confidence={prediction.confidence} label={t.confidence} />
          </View>
          <Text style={styles.confidenceNote}>{t.confidenceDisclaimer}</Text>
        </View>

        <SectionCard title={t.diseaseOverview} items={[display.overview]} initiallyExpanded accentColor={colors.info} />
        <SectionCard title={t.symptoms} items={display.symptoms} initiallyExpanded accentColor={colors.warning} />
        <SectionCard title={t.causes} items={display.cause} />
        <SectionCard title={t.treatment} items={display.treatment} accentColor={colors.primary} />
        <SectionCard title={t.pesticideOptions} items={display.pesticide} />
        <SectionCard title={t.organicTreatment} items={display.organicTreatment} />
        <SectionCard title={t.prevention} items={display.prevention} />
        <SectionCard title={t.fertilizerSuggestions} items={display.fertilizer} />
        <SectionCard title={t.cropCareSection} items={display.cropCare} />

        <Text style={styles.disclaimer}>{t.disclaimerNote}</Text>

        <View style={styles.actions}>
          {!isSaved && <AppButton label={t.saveToHistory} onPress={handleSave} />}
          <View style={{ height: spacing.md }} />
          <AppButton
            label={t.scanAnotherLeaf}
            onPress={() => router.replace("/(tabs)/scan")}
            variant="outline"
          />
          <View style={{ height: spacing.md }} />
          <AppButton
            label={t.backToHome}
            onPress={() => router.replace("/(tabs)/home")}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  notFoundText: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.lg },
  scrollContent: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  image: { width: "100%", aspectRatio: 1, borderRadius: radius.lg, backgroundColor: colors.surface },
  summary: { marginTop: spacing.lg, marginBottom: spacing.lg },
  cropLabel: { ...typography.caption, color: colors.textMuted, textTransform: "uppercase" },
  diseaseName: { ...typography.h2, color: colors.textPrimary, marginTop: 2 },
  confidenceNote: { ...typography.caption, color: colors.textMuted, marginTop: spacing.sm },
  disclaimer: { ...typography.caption, color: colors.textMuted, textAlign: "center", marginVertical: spacing.lg },
  actions: { marginTop: spacing.sm },
});
