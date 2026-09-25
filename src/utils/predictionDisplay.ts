import { DiseasePrediction, Language } from "../types";
import { findDiseaseById } from "../data/diseases";

export interface PredictionDisplayContent {
  overview: string;
  symptoms: string[];
  cause: string[];
  treatment: string[];
  pesticide: string[];
  organicTreatment: string[];
  prevention: string[];
  fertilizer: string[];
  cropCare: string[];
}

function pick(raw: string[], localized?: string[]): string[] {
  if (raw && raw.length) return raw;
  if (localized && localized.length) return localized;
  return [];
}

export function resolvePredictionDisplay(
  prediction: DiseasePrediction,
  language: Language,
  fallbackOverviewText: string
): PredictionDisplayContent {
  const localized = prediction.diseaseId ? findDiseaseById(prediction.diseaseId, language) : undefined;

  return {
    overview: localized?.overview || fallbackOverviewText,
    symptoms: pick(prediction.rawSymptoms, localized?.symptoms),
    cause: pick(prediction.rawCause, localized?.cause),
    treatment: pick(prediction.rawTreatment, localized?.treatment),
    pesticide: pick(prediction.rawPesticide, localized?.pesticide),
    organicTreatment: pick(prediction.rawOrganicTreatment, localized?.organicTreatment),
    prevention: pick(prediction.rawPrevention, localized?.prevention),
    fertilizer: pick(prediction.rawFertilizer, localized?.fertilizer),
    cropCare: pick(prediction.rawCropCare, localized?.cropCare),
  };
}
