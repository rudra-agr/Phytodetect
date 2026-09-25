import React, { useCallback } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { colors, spacing, typography } from "../../src/theme";
import { EmptyState, HistoryCard, ScreenHeader } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { useHistory } from "../../src/hooks/useHistory";
import { translateCropLabel } from "../../src/utils/labels";

export default function HistoryScreen() {
  const { t } = useTranslation();
  const { items, reload, removeItem, clearAll } = useHistory();

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const confirmClear = () => {
    Alert.alert(t.clearHistory, t.clearHistoryConfirm, [
      { text: t.cancel, style: "cancel" },
      { text: t.confirm, style: "destructive", onPress: clearAll },
    ]);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(t.delete, t.deleteHistoryItemConfirm, [
      { text: t.cancel, style: "cancel" },
      { text: t.delete, style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader
        title={t.historyTitle}
        right={
          items.length > 0 ? (
            <Text style={styles.clearAction} onPress={confirmClear}>
              {t.clearHistory}
            </Text>
          ) : null
        }
      />
      {items.length === 0 ? (
        <EmptyState
          title={t.noHistoryTitle}
          description={t.noHistoryDesc}
          icon={<Text style={styles.emptyIcon}>🕘</Text>}
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HistoryCard
              crop={translateCropLabel(item.crop, t)}
              disease={item.disease}
              confidence={item.confidence}
              date={item.createdAt}
              imageUri={item.imageUri}
              onPress={() => router.push(`/result/${item.id}`)}
              onDelete={() => confirmDelete(item.id)}
              deleteLabel={t.delete}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  clearAction: { ...typography.bodyBold, color: colors.danger },
  emptyIcon: { fontSize: 40 },
});
