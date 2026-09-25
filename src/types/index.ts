export type Language = "en" | "ne";

export interface RawPredictionResponse {
  disease: string;
  confidence: number;
  crop?: string;
  symptoms?: string | string[];
  cause?: string | string[];
  treatment?: string | string[];
  prevention?: string | string[];
  pesticide?: string | string[];
  organicTreatment?: string | string[];
  fertilizer?: string | string[];
  cropCare?: string | string[];
}

export interface DiseasePrediction {
  id: string;
  disease: string;
  crop: string;
  confidence: number;
  imageUri: string;
  createdAt: string;
  diseaseId: string | null;
  rawSymptoms: string[];
  rawCause: string[];
  rawTreatment: string[];
  rawPesticide: string[];
  rawOrganicTreatment: string[];
  rawPrevention: string[];
  rawFertilizer: string[];
  rawCropCare: string[];
  source: "backend" | "mock" | "local";
}

export interface DiseaseInformation {
  id: string;
  name: string;
  crop: string;
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

export interface HistoryItem {
  id: string;
  disease: string;
  crop: string;
  confidence: number;
  imageUri: string;
  createdAt: string;
  prediction: DiseasePrediction;
}

export interface CropInformation {
  id: string;
  name: string;
  overview: string;
  watering: string;
  fertilizer: string;
  commonDiseaseRisks: string[];
  prevention: string[];
  generalCare: string[];
}

export interface FarmerTip {
  id: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}

export type NetworkState = "online" | "offline" | "unknown";

export type ApiErrorType =
  | "network"
  | "timeout"
  | "invalid_image"
  | "server"
  | "unknown";

export class ApiError extends Error {
  type: ApiErrorType;

  constructor(type: ApiErrorType, message: string) {
    super(message);
    this.name = "ApiError";
    this.type = type;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
