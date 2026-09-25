import { DiseasePrediction } from "../types";

const cache = new Map<string, DiseasePrediction>();

export const predictionCache = {
  set(prediction: DiseasePrediction) {
    cache.set(prediction.id, prediction);
  },
  get(id: string): DiseasePrediction | undefined {
    return cache.get(id);
  },
};
