import React from "react";
import { Text } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";
import { useTranslation } from "../../src/i18n";

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{symbol}</Text>
  );
}

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { borderTopColor: colors.border, height: 62, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t.tabHome,
          tabBarLabel: t.tabHome,
          tabBarIcon: ({ focused }) => <TabIcon symbol="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarLabel: t.scanLeaf,
          tabBarIcon: ({ focused }) => <TabIcon symbol="📷" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: t.history,
          tabBarIcon: ({ focused }) => <TabIcon symbol="🕘" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          tabBarLabel: t.assistant,
          tabBarIcon: ({ focused }) => <TabIcon symbol="💬" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: t.settingsTitle,
          tabBarIcon: ({ focused }) => <TabIcon symbol="⚙️" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
