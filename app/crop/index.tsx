import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, radius, spacing, typography } from "../../src/theme";
import { AppCard, ScreenHeader } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { getCrops } from "../../src/data/crops";

export default function CropHubScreen() {
  const { t, language } = useTranslation();
  const crops = getCrops(language);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={t.cropCareTitle} subtitle={t.selectCropPrompt} />
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <AppCard
            onPress={() => router.push(`/crop/${item.id}`)}
            style={styles.card}
            accessibilityLabel={item.name}
          >
            <View style={styles.cardRow}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🌾</Text>
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cropName}>{item.name}</Text>
                <Text style={styles.cropOverview} numberOfLines={2}>
                  {item.overview}
                </Text>
              </View>
            </View>
          </AppCard>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  card: { padding: spacing.md },
  cardRow: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySurface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  iconText: { fontSize: 24 },
  cardText: { flex: 1 },
  cropName: { ...typography.subtitle, color: colors.textPrimary },
  cropOverview: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
});
