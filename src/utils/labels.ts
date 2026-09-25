import { TranslationKeys } from "../i18n/en";

export function translateCropLabel(rawName: string, t: TranslationKeys): string {
  const key = rawName.trim().toLowerCase();
  if (key === "tomato") return t.cropTomato;
  if (key === "potato") return t.cropPotato;
  if (key === "corn" || key === "maize" || key === "corn / maize") return t.cropCorn;
  if (key === "apple") return t.cropApple;
  return rawName;
}
