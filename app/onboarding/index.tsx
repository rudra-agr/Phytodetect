import React, { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { colors, spacing, typography } from "../../src/theme";
import { AppButton } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { setOnboardingComplete } from "../../src/storage/settingsStorage";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);
  const [pageIndex, setPageIndex] = useState(0);

  const slides = [
    { icon: "🔍", title: t.onboarding_title_1, description: t.onboarding_desc_1 },
    { icon: "💊", title: t.onboarding_title_2, description: t.onboarding_desc_2 },
    { icon: "🌱", title: t.onboarding_title_3, description: t.onboarding_desc_3 },
  ];

  const finish = async () => {
    await setOnboardingComplete();
    router.replace("/(tabs)/home");
  };

  const goNext = () => {
    if (pageIndex < slides.length - 1) {
      const nextIndex = pageIndex + 1;
      setPageIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: width * nextIndex, y: 0, animated: true });
    } else {
      finish();
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== pageIndex) {
      setPageIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
        <Pressable onPress={finish} accessibilityRole="button" accessibilityLabel={t.skip}>
          <Text style={styles.skipText}>{t.skip}</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        directionalLockEnabled
      >
        {slides.map((item, index) => (
          <View style={[styles.slide, { width }]} key={`slide-${index}`}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {slides.map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[styles.dot, index === pageIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <AppButton
          label={pageIndex === slides.length - 1 ? t.getStarted : t.next}
          onPress={goNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: { flexDirection: "row", paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  skipText: { ...typography.bodyBold, color: colors.textSecondary },
  slide: { alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xxl },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primarySurface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xxl,
  },
  iconText: { fontSize: 56 },
  title: { ...typography.h2, color: colors.textPrimary, textAlign: "center", marginBottom: spacing.md },
  description: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
  dotsRow: { flexDirection: "row", justifyContent: "center", marginVertical: spacing.lg },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  dotActive: { backgroundColor: colors.primary, width: 20 },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
});
