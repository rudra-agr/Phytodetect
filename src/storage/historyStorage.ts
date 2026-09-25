import AsyncStorage from "@react-native-async-storage/async-storage";
import { HistoryItem, DiseasePrediction } from "../types";

const HISTORY_KEY = "phytodetect_history";

async function readAll(): Promise<HistoryItem[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as HistoryItem[];
    return [];
  } catch (e) {
    return [];
  }
}

async function writeAll(items: HistoryItem[]): Promise<void> {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch (e) {
    // storage unavailable, ignore
  }
}

export const historyRepository = {
  async getAll(): Promise<HistoryItem[]> {
    const items = await readAll();
    return items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async getById(id: string): Promise<HistoryItem | undefined> {
    const items = await readAll();
    return items.find((item) => item.id === id);
  },

  async add(prediction: DiseasePrediction): Promise<HistoryItem> {
    const items = await readAll();
    const historyItem: HistoryItem = {
      id: prediction.id,
      disease: prediction.disease,
      crop: prediction.crop,
      confidence: prediction.confidence,
      imageUri: prediction.imageUri,
      createdAt: prediction.createdAt,
      prediction,
    };
    const filtered = items.filter((item) => item.id !== historyItem.id);
    const updated = [historyItem, ...filtered];
    await writeAll(updated);
    return historyItem;
  },

  async remove(id: string): Promise<void> {
    const items = await readAll();
    await writeAll(items.filter((item) => item.id !== id));
  },

  async clear(): Promise<void> {
    await writeAll([]);
  },
};
