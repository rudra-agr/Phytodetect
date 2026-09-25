export const en = {
  appName: "PhytoDetect",
  appSubtitle: "AI-Powered Crop Disease Detection & Farmer Assistant",

  onboarding_title_1: "Detect Crop Diseases",
  onboarding_desc_1:
    "Upload or capture a crop leaf image and let AI identify possible diseases.",
  onboarding_title_2: "Get Treatment Guidance",
  onboarding_desc_2:
    "View symptoms, causes, treatments, prevention and agricultural recommendations.",
  onboarding_title_3: "Keep Your Crop Healthy",
  onboarding_desc_3:
    "Access history, crop-care information and localized recommendations.",
  skip: "Skip",
  next: "Next",
  getStarted: "Get Started",

  tabHome: "Home",

  greeting: "Namaste, Farmer",
  homeSubtitle: "Keep your crops healthy",
  detectDiseaseTitle: "Detect Crop Disease",
  detectDiseaseDesc:
    "Take a photo or upload a leaf image to identify possible crop diseases.",
  scanLeaf: "Scan Leaf",
  quickActions: "Quick Actions",
  history: "History",
  cropCare: "Crop Care",
  assistant: "Assistant",
  tips: "Tips",
  recentDetections: "Recent Detections",
  noRecentDetections: "No detections yet. Scan a leaf to get started.",
  farmerTips: "Farmer Tips",

  takePhoto: "Take Photo",
  uploadFromGallery: "Upload from Gallery",
  retake: "Retake",
  remove: "Remove",
  scanDetect: "Scan & Detect",
  analyzingCrop: "Analyzing your crop...",
  selectImagePrompt: "Select or capture a leaf image to begin.",

  confidence: "confidence",
  diseaseOverview: "Disease Overview",
  overviewUnavailable: "Detailed disease overview is not available for this result.",
  symptoms: "Symptoms",
  causes: "Causes",
  treatment: "Treatment",
  pesticideOptions: "Pesticide Options",
  organicTreatment: "Organic Treatment",
  prevention: "Prevention",
  fertilizerSuggestions: "Fertilizer Suggestions",
  cropCareSection: "Crop Care",
  saveToHistory: "Save to History",
  scanAnotherLeaf: "Scan Another Leaf",
  backToHome: "Back to Home",
  savedToHistory: "Saved to history",
  confidenceDisclaimer:
    "This confidence score reflects the AI model's estimate, not a guaranteed diagnosis.",

  historyTitle: "Disease History",
  clearHistory: "Clear History",
  clearHistoryConfirm: "Are you sure you want to clear all history?",
  deleteHistoryItemConfirm: "Are you sure you want to delete this item from your history?",
  noHistoryTitle: "No history yet",
  noHistoryDesc: "Your scanned crops will appear here.",
  cancel: "Cancel",
  confirm: "Confirm",
  delete: "Delete",

  askAssistant: "Ask Assistant",
  assistantPlaceholder: "Ask about crop care, fertilizer, prevention...",
  assistantIntro:
    "Hello! I am your Farmer Assistant. Ask me about crop care, fertilizer or disease prevention.",
  send: "Send",
  sampleQuestion1: "How can I prevent tomato disease?",
  sampleQuestion2: "What fertilizer is suitable for tomato?",
  sampleQuestion3: "How often should I inspect leaves?",

  cropCareTitle: "Crop Care Guide",
  selectCropPrompt: "Select a crop to view detailed care guidance.",
  overview: "Overview",
  watering: "Watering",
  fertilizer: "Fertilizer",
  diseaseRisks: "Common Disease Risks",
  generalCare: "General Care",

  settingsTitle: "Settings",
  language: "Language",
  notifications: "Notifications",
  notificationsComingSoon: "Coming soon",
  aboutApp: "About PhytoDetect",
  aboutAppDesc:
    "PhytoDetect is a final-year major project developed to help farmers detect crop diseases using AI and receive practical agricultural guidance.",
  apiStatus: "Backend / API Status",
  privacy: "Privacy Information",
  privacyDesc:
    "Images are used only for disease prediction. History is stored locally on your device.",
  appVersion: "App Version",
  connected: "Connected",
  disconnected: "Disconnected",
  checkingStatus: "Checking...",
  mockModeActive: "Mock mode active (no backend required)",

  errorNetworkTitle: "Connection Problem",
  errorNetwork:
    "Unable to connect to the disease detection service. Please check your internet connection and try again.",
  errorInvalidImage: "Please select a clear crop-leaf image.",
  errorImageTooLarge: "This image file is too large. Please choose a smaller photo.",
  errorPredictionFailed:
    "We couldn't analyze this image. Please try another photo with the leaf clearly visible.",
  errorTimeout: "The request took too long. Please try again.",
  errorGeneric: "Something went wrong. Please try again.",
  retry: "Retry",

  offlineBanner: "You are offline. Disease detection requires an internet connection.",

  cropTomato: "Tomato",
  cropPotato: "Potato",
  cropCorn: "Corn / Maize",
  cropApple: "Apple",

  permissionDeniedTitle: "Permission Required",
  permissionDeniedCamera:
    "Camera access is needed to take a photo of your crop leaf.",
  permissionDeniedGallery:
    "Gallery access is needed to select a crop leaf image.",
  openSettings: "Open Settings",

  loading: "Loading...",
  disclaimerNote:
    "These recommendations are general guidance and not authoritative agricultural or medical prescriptions.",
};

export type TranslationKeys = typeof en;
