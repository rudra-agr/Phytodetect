import { FarmerTip, Language } from "../types";

const tipsEn: FarmerTip[] = [
  {
    id: "tip-1",
    title: "Inspect Leaves Regularly",
    description: "Check the undersides of leaves weekly to catch early signs of disease.",
  },
  {
    id: "tip-2",
    title: "Water at the Base",
    description: "Watering at the soil level instead of overhead reduces fungal disease risk.",
  },
  {
    id: "tip-3",
    title: "Rotate Your Crops",
    description: "Avoid planting the same crop family in the same spot every season.",
  },
  {
    id: "tip-4",
    title: "Maintain Spacing",
    description: "Proper plant spacing improves airflow and reduces humidity around leaves.",
  },
  {
    id: "tip-5",
    title: "Remove Infected Debris",
    description: "Clear fallen leaves and infected plant matter to limit disease spread.",
  },
  {
    id: "tip-6",
    title: "Balance Your Fertilizer",
    description: "Excess nitrogen can create soft growth that is more vulnerable to disease.",
  },
];

const tipsNe: FarmerTip[] = [
  {
    id: "tip-1",
    title: "पातहरू नियमित निरीक्षण गर्नुहोस्",
    description: "रोगका प्रारम्भिक लक्षणहरू पत्ता लगाउन साप्ताहिक रूपमा पातको तल्लो भाग जाँच गर्नुहोस्।",
  },
  {
    id: "tip-2",
    title: "जरामा पानी दिनुहोस्",
    description: "माथिबाट भन्दा माटोको सतहमा पानी दिँदा फफूंदीजन्य रोगको जोखिम घट्छ।",
  },
  {
    id: "tip-3",
    title: "बाली फेरबदल गर्नुहोस्",
    description: "हरेक सिजनमा एउटै ठाउँमा एउटै प्रजातिको बाली नलगाउनुहोस्।",
  },
  {
    id: "tip-4",
    title: "उचित दूरी कायम राख्नुहोस्",
    description: "उचित बोट दूरीले हावा आवतजावत सुधार्छ र पातहरू वरिपरिको आर्द्रता घटाउँछ।",
  },
  {
    id: "tip-5",
    title: "संक्रमित फोहोर हटाउनुहोस्",
    description: "रोग फैलावट सीमित गर्न झरेका पात र संक्रमित बिरुवाका भागहरू हटाउनुहोस्।",
  },
  {
    id: "tip-6",
    title: "मल सन्तुलित राख्नुहोस्",
    description: "अत्यधिक नाइट्रोजनले नरम वृद्धि निम्त्याउँछ जुन रोगप्रति बढी संवेदनशील हुन्छ।",
  },
];

export function getTips(language: Language): FarmerTip[] {
  return language === "ne" ? tipsNe : tipsEn;
}
