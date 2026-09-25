import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../types";

const LANGUAGE_KEY = "phytodetect_language";
const ONBOARDING_KEY = "phytodetect_onboarding_complete";

export async function getLanguage(): Promise<Language | null> {
  try {
    const value = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (value === "en" || value === "ne") return value;
    return null;
  } catch (e) {
    return null;
  }
}

export async function setLanguage(language: Language): Promise<void> {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (e) {
    // storage unavailable, ignore
  }
}

export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === "true";
  } catch (e) {
    return false;
  }
}

export async function setOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch (e) {
    // storage unavailable, ignore
  }
}
