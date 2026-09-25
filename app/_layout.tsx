import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LanguageProvider } from "../src/i18n";
import { colors } from "../src/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding/index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="result/[id]" />
          <Stack.Screen name="disease/[id]" />
          <Stack.Screen name="crop/index" />
          <Stack.Screen name="crop/[id]" />
          <Stack.Screen
            name="camera"
            options={{ presentation: "fullScreenModal", animation: "slide_from_bottom" }}
          />
        </Stack>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
