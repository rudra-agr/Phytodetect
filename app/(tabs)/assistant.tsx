import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing, typography } from "../../src/theme";
import { ScreenHeader, SectionCard } from "../../src/components";
import { useTranslation } from "../../src/i18n";
import { ChatMessage } from "../../src/types";
import { generateId } from "../../src/utils/formatUtils";
import { getAssistantResponse } from "../../src/data/assistantResponses";
import { getCrops } from "../../src/data/crops";

export default function AssistantScreen() {
  const { t, language } = useTranslation();
  const crops = getCrops(language);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId("msg"),
      role: "assistant",
      text: t.assistantIntro,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 1) {
      const timer = setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: generateId("msg"),
      role: "user",
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: ChatMessage = {
      id: generateId("msg"),
      role: "assistant",
      text: getAssistantResponse(trimmed, language),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  const sampleQuestions = [t.sampleQuestion1, t.sampleQuestion2, t.sampleQuestion3];

  const fertilizerTips = crops.map((crop) => `${crop.name}: ${crop.fertilizer}`);
  const preventionTips = crops.flatMap((crop) => crop.prevention.map((p) => `${crop.name}: ${p}`));
  const cropCareTips = crops.flatMap((crop) => crop.generalCare.map((c) => `${crop.name}: ${c}`));

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScreenHeader title={t.assistant} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.infoSections}>
              <SectionCard title={t.fertilizer} items={fertilizerTips} />
              <SectionCard title={t.prevention} items={preventionTips} />
              <SectionCard title={t.cropCareSection} items={cropCareTips} />
              <Text style={styles.chatSectionTitle}>{t.askAssistant}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.role === "user" ? styles.userBubble : styles.assistantBubble,
              ]}
            >
              <Text style={item.role === "user" ? styles.userText : styles.assistantText}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.sampleRow}>
          {sampleQuestions.map((question) => (
            <Pressable
              key={question}
              onPress={() => sendMessage(question)}
              style={styles.sampleChip}
              accessibilityRole="button"
              accessibilityLabel={question}
            >
              <Text style={styles.sampleChipText} numberOfLines={1}>
                {question}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={t.assistantPlaceholder}
            placeholderTextColor={colors.textMuted}
            style={styles.textInput}
            accessibilityLabel={t.assistantPlaceholder}
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
          />
          <Pressable
            onPress={() => sendMessage(input)}
            style={styles.sendButton}
            accessibilityRole="button"
            accessibilityLabel={t.send}
          >
            <Text style={styles.sendButtonText}>{t.send}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  infoSections: { marginBottom: spacing.md },
  chatSectionTitle: { ...typography.h3, color: colors.textPrimary, marginTop: spacing.md, marginBottom: spacing.sm },
  bubble: { maxWidth: "85%", borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm },
  userBubble: { backgroundColor: colors.primary, alignSelf: "flex-end", borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: colors.surface, alignSelf: "flex-start", borderBottomLeftRadius: 4 },
  userText: { ...typography.body, color: colors.white },
  assistantText: { ...typography.body, color: colors.textPrimary },
  sampleRow: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: spacing.xl, paddingBottom: spacing.sm },
  sampleChip: {
    backgroundColor: colors.primarySurface,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    maxWidth: "100%",
  },
  sampleChipText: { ...typography.caption, color: colors.primaryDark },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.textPrimary,
    marginRight: spacing.sm,
    minHeight: 48,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: { ...typography.button, color: colors.white },
});
