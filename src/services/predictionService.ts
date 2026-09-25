import axios from "axios";
import { apiClient, USE_MOCK_API } from "./api";
import { ApiError, DiseasePrediction, RawPredictionResponse } from "../types";
import { toArray, generateId } from "../utils/formatUtils";
import { getMimeTypeFromUri, getFileNameFromUri } from "../utils/imageUtils";
import { findDiseaseByName } from "../data/diseases";

const MOCK_RESULT: RawPredictionResponse = {
  disease: "Tomato Early Blight",
  crop: "Tomato",
  confidence: 0.943,
};

function mapToPrediction(
  raw: RawPredictionResponse,
  imageUri: string,
  source: DiseasePrediction["source"]
): DiseasePrediction {
  const matched = findDiseaseByName(raw.disease);

  return {
    id: generateId("prediction"),
    disease: raw.disease,
    crop: raw.crop || matched?.crop || "Unknown",
    confidence: raw.confidence,
    imageUri,
    createdAt: new Date().toISOString(),
    diseaseId: matched?.id ?? null,
    rawSymptoms: toArray(raw.symptoms),
    rawCause: toArray(raw.cause),
    rawTreatment: toArray(raw.treatment),
    rawPesticide: toArray(raw.pesticide),
    rawOrganicTreatment: toArray(raw.organicTreatment),
    rawPrevention: toArray(raw.prevention),
    rawFertilizer: toArray(raw.fertilizer),
    rawCropCare: toArray(raw.cropCare),
    source,
  };
}

async function simulateMockPrediction(imageUri: string): Promise<DiseasePrediction> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return mapToPrediction(MOCK_RESULT, imageUri, "mock");
}

export async function predictDisease(imageUri: string): Promise<DiseasePrediction> {
  if (USE_MOCK_API) {
    return simulateMockPrediction(imageUri);
  }

  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    name: getFileNameFromUri(imageUri),
    type: getMimeTypeFromUri(imageUri),
  } as unknown as Blob);

  try {
    const response = await apiClient.post<RawPredictionResponse>("/predict", formData);

    if (!response.data || !response.data.disease) {
      throw new ApiError("server", "errorPredictionFailed");
    }

    return mapToPrediction(response.data, imageUri, "backend");
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new ApiError("timeout", "errorTimeout");
      }
      if (!error.response) {
        throw new ApiError("network", "errorNetwork");
      }
      if (error.response.status === 422 || error.response.status === 400) {
        throw new ApiError("invalid_image", "errorInvalidImage");
      }
      throw new ApiError("server", "errorPredictionFailed");
    }

    throw new ApiError("unknown", "errorGeneric");
  }
}
