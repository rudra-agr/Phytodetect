# PhytoDetect

**AI-Powered Crop Disease Detection & Farmer Assistant**

A final-year major project frontend built with React Native and Expo, developed for the Institute of Engineering, Paschimanchal Campus, Pokhara. PhytoDetect helps farmers detect crop diseases from leaf images and provides treatment, prevention, and agricultural guidance.

## Features

- Splash screen and guided onboarding
- Farmer dashboard with quick actions, recent detections, and daily tips
- Disease scanner with camera capture or gallery upload
- AI disease prediction via a configurable FastAPI backend (`POST /predict`)
- Detection result screen with confidence score, symptoms, causes, treatment, pesticide, organic treatment, prevention, fertilizer, and crop-care sections
- Local disease-information lookup that enriches backend responses when partial data is returned
- Disease history stored locally with delete and clear-all support
- Farmer Assistant with mock chat-style Q&A, ready for real API integration
- Crop Care hub screen for browsing Tomato, Potato, Corn/Maize, and Apple guidance
- Scanned leaf photos are copied into permanent app storage before being used, so History and Result thumbnails survive app restarts
- Settings screen with language switch, backend status, privacy info, and app version
- Full English and Nepali localization
- Offline-friendly local data for history, crop care, tips, and disease information
- Mock mode so the app runs fully without a backend

## Tech Stack

- React Native + Expo (SDK 57)
- Expo Router (file-based navigation)
- TypeScript
- Axios for networking
- AsyncStorage for local persistence

## Changelog

**Upgraded from Expo SDK 51 to SDK 57** so the project works with the current version of Expo Go
(Play Store build 57.0.x). All `expo-*` packages, React (19.2), and React Native (0.86) were
bumped to the versions Expo SDK 57 expects, and a few APIs that changed along the way were
updated:
- `expo-file-system`'s classic `documentDirectory`/`getInfoAsync` API now comes from
  `expo-file-system/legacy` (the package moved to a new file/directory API by default).
- `expo-status-bar`'s Android-only `backgroundColor` prop was removed (Android is edge-to-edge
  by default now).
- `expo-image-picker`'s `mediaTypes` now uses the `["images"]` array form instead of the
  deprecated `MediaTypeOptions` enum.

**Fixed camera capture on web/desktop.** The "Take Photo" button used to call
`ImagePicker.launchCameraAsync()`, which on the web simply clicks a hidden
`<input type="file" capture>` element. Desktop browsers largely ignore the `capture` attribute,
so on a laptop it silently fell back to the plain OS file picker — which looked like the gallery
was opening instead of the camera, even though the exact same code path worked correctly on
Android (where the attribute is honored). The fix adds a real in-app camera screen
(`app/camera.tsx`) built with `expo-camera`'s `CameraView`, which uses `getUserMedia` on web to
show an actual live camera preview and capture a frame from it — this now behaves the same way
on Android and on a laptop with a webcam.
- Expo Image Picker, Expo Image Manipulator, Expo Localization, Expo Network

## Project Structure

```text
app/                Expo Router screens (navigation)
  onboarding/        Onboarding flow
  (tabs)/            Bottom tab screens: home, scan, history, assistant, settings
  disease/[id].tsx   Reusable disease information screen
  crop/[id].tsx      Crop-care detail screen
  result/[id].tsx    Detection result screen

src/
  components/        Reusable UI components
  constants/          (reserved for future constants)
  data/               Local mock datasets (diseases, crops, tips, assistant)
  hooks/              Custom hooks (history, network status)
  i18n/               Localization (English & Nepali)
  services/           API client and prediction service
  storage/            AsyncStorage-backed repositories
  types/              Shared TypeScript types
  utils/              Image, network, and formatting helpers
  theme/              Centralized colors, typography, spacing, radius
```

## Installation

```bash
git clone <repository-url>
cd phytodetect
npm install
npx expo start
```

## Environment Setup

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

```text
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_USE_MOCK_API=true
```

`.env` is git-ignored and should never contain secrets. Only non-secret configuration belongs here.

## Mock Mode

Set `EXPO_PUBLIC_USE_MOCK_API=true` to run the app without a backend. Scanning will simulate a short delay and return a realistic sample prediction (Tomato Early Blight) that flows through the normal result and history screens. Set it to `false` to call the real backend.

## Backend Connection

When mock mode is disabled, the app sends a `POST /predict` request with `multipart/form-data` to `EXPO_PUBLIC_API_URL`, with the image attached under the field name `file`. The backend is expected to return at minimum:

```json
{ "disease": "Tomato Early Blight", "confidence": 0.943, "crop": "Tomato" }
```

Additional fields such as `symptoms`, `cause`, `treatment`, `pesticide`, `organicTreatment`, `prevention`, `fertilizer`, and `cropCare` are used when present. Missing fields are enriched from the local disease database in `src/data/diseases.ts` when a matching disease name is found.

The app never sets the `Content-Type` header manually on the upload request — it lets Axios/React Native generate the correct multipart boundary automatically. Setting that header explicitly is a common cause of "422 / malformed request" errors against FastAPI and has been deliberately avoided here.

**Important — `localhost` and Android:** `EXPO_PUBLIC_API_URL=http://localhost:8000` only works when the app itself is running on the same machine as the backend (e.g. Expo web). It will **not** work from:
- an Android emulator — use `http://10.0.2.2:8000` instead, which the emulator maps to the host machine, or
- a physical device (Expo Go or a dev build) — use your computer's LAN IP address, e.g. `http://192.168.x.x:8000`, with the device and computer on the same network.

If the Settings screen shows "Disconnected" while your backend is clearly running, this is almost always the cause.

## Running on Android

- **Expo Go**: scan the QR code shown by `npx expo start` using the Expo Go app.
- **Emulator**: press `a` in the Expo CLI after starting, with an Android emulator running.
- **Physical device**: connect via Expo Go or a development build over the same network.

**Camera on Android emulators:** tapping "Take Photo" calls `ImagePicker.launchCameraAsync`, which opens whatever camera the emulator is configured with. Most default Android Virtual Devices ship with the back camera set to **"Emulated"**, which is not a live camera feed — it shows a built-in carousel of stock placeholder photos, which can look like a gallery picker. To get a real live camera preview in the emulator:
1. Open Android Studio → **Virtual Device Manager** → edit your AVD.
2. Set **Camera → Back** to **Webcam0** (uses your computer's webcam) instead of "Emulated" or "None".
3. Cold-boot the emulator for the change to apply.

Alternatively, test the camera flow on a **physical device** via Expo Go, which always uses the real device camera. "Upload from Gallery" is unaffected by this and works normally on any emulator.

## Localization Architecture

Every screen's static text is translated via `src/i18n`. All bundled demo content (disease info, crop guides, farmer tips, and the Assistant's canned responses) also ships in both English and Nepali and is looked up by the current language at render time — so switching languages retranslates history, results, crop care, and the assistant, not just menu labels. Disease and crop **names** are intentionally kept as-is across languages (agricultural/scientific names are not auto-translated), while all supporting descriptions (symptoms, causes, treatment, etc.) are fully localized. If a real backend returns its own free-text content (symptoms, treatment, etc.) instead of just a disease name, that raw text is shown as returned and cannot be automatically translated, since it originates outside the app.

## Development Notes

- **API URL**: change `EXPO_PUBLIC_API_URL` in `.env`.
- **Local disease/crop data**: edit `src/data/diseases.ts` and `src/data/crops.ts`. Each file exports separate English and Nepali content arrays (same `id`s, same order) plus a `getDiseases(language)`/`getCrops(language)` accessor — add new entries to both arrays at the same index.
- **Translations**: edit `src/i18n/en.ts` and `src/i18n/ne.ts` for UI copy; edit `src/data/tips.ts` and `src/data/assistantResponses.ts` for bilingual tips and assistant replies.
- **Mock predictions**: edit the sample result in `src/services/predictionService.ts`.
- **Theme**: colors, typography, spacing, and radius live in `src/theme/`.

## Disclaimer

Disease predictions and agricultural recommendations shown in this app are general guidance generated for demonstration purposes and are not a substitute for professional agricultural or scientific advice.
