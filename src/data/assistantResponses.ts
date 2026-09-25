import { Language } from "../types";

interface AssistantRule {
  enKeywords: string[];
  neKeywords: string[];
  enResponse: string;
  neResponse: string;
}

const rules: AssistantRule[] = [
  {
    enKeywords: ["prevent", "tomato", "disease"],
    neKeywords: ["टमाटर", "रोग", "रोक"],
    enResponse:
      "To help prevent tomato disease, water at the base of plants, keep good spacing for airflow, rotate crops each season, and remove infected leaves promptly.",
    neResponse:
      "टमाटरको रोग रोक्न, बोटको जरामा पानी दिनुहोस्, हावा आवतजावतको लागि उचित दूरी राख्नुहोस्, हरेक सिजनमा बाली फेरबदल गर्नुहोस्, र संक्रमित पातहरू तुरुन्तै हटाउनुहोस्।",
  },
  {
    enKeywords: ["fertilizer", "tomato"],
    neKeywords: ["मल", "टमाटर"],
    enResponse:
      "Tomatoes generally benefit from a balanced fertilizer with adequate potassium, especially once flowering and fruiting begin.",
    neResponse:
      "टमाटरको लागि सामान्यतया पर्याप्त पोटासियमसहितको सन्तुलित मल राम्रो हुन्छ, विशेष गरी फूल र फल लाग्न सुरु भएपछि।",
  },
  {
    enKeywords: ["inspect", "leaves", "often"],
    neKeywords: ["पात", "जाँच", "निरीक्षण"],
    enResponse:
      "It is a good practice to inspect your crop leaves at least once or twice a week, checking both the top and underside of leaves for early signs of disease.",
    neResponse:
      "आफ्नो बालीका पातहरू हप्तामा कम्तीमा एक वा दुई पटक जाँच गर्नु राम्रो अभ्यास हो, रोगका प्रारम्भिक लक्षणहरूको लागि पातको माथि र तल दुवैतिर हेर्नुहोस्।",
  },
  {
    enKeywords: ["potato"],
    neKeywords: ["आलु"],
    enResponse:
      "For potatoes, use certified disease-free seed, maintain consistent soil moisture during tuber formation, and monitor closely during wet weather for signs of blight.",
    neResponse:
      "आलुको लागि, प्रमाणित रोगमुक्त बीउ प्रयोग गर्नुहोस्, गेडा बन्ने बेलामा माटोमा निरन्तर चिस्यान कायम राख्नुहोस्, र आर्द्र मौसममा ब्लाइटका लक्षणहरूको लागि नजिकबाट निगरानी गर्नुहोस्।",
  },
  {
    enKeywords: ["corn", "maize"],
    neKeywords: ["मकै"],
    enResponse:
      "Corn generally needs consistent watering during tasseling, balanced nitrogen fertilizer, and regular scouting for rust or leaf blight symptoms.",
    neResponse:
      "मकैलाई सामान्यतया फूल लाग्ने बेला निरन्तर सिंचाइ, सन्तुलित नाइट्रोजन मल, र रस्ट वा लिफ ब्लाइटका लक्षणहरूको लागि नियमित जाँच आवश्यक पर्छ।",
  },
  {
    enKeywords: ["apple"],
    neKeywords: ["स्याउ"],
    enResponse:
      "Apple trees benefit from annual pruning for airflow, removal of fallen leaves, and preventive fungicide programs against common diseases like apple scab.",
    neResponse:
      "स्याउका रूखहरूलाई हावा आवतजावतको लागि वार्षिक काटछाँट, झरेका पात हटाउने काम, र एप्पल स्क्याब जस्ता सामान्य रोगविरुद्ध रोकथाम फफूंदीनाशक कार्यक्रम लाभदायक हुन्छ।",
  },
  {
    enKeywords: ["organic"],
    neKeywords: ["जैविक"],
    enResponse:
      "Organic approaches include removing infected material, maintaining good sanitation, using neem or copper-based sprays where locally approved, and ensuring proper spacing.",
    neResponse:
      "जैविक तरिकाहरूमा संक्रमित सामग्री हटाउने, राम्रो सरसफाइ कायम राख्ने, स्थानीय रूपमा स्वीकृत भएमा नीम वा तामा आधारित स्प्रे प्रयोग गर्ने, र उचित दूरी सुनिश्चित गर्ने समावेश छ।",
  },
  {
    enKeywords: ["water", "irrigation"],
    neKeywords: ["पानी", "सिंचाइ"],
    enResponse:
      "Water your crops at the base rather than overhead where possible, and maintain consistent soil moisture without waterlogging the roots.",
    neResponse:
      "सम्भव भएसम्म माथिबाट भन्दा जरामा पानी दिनुहोस्, र जरा नडुबाई माटोमा निरन्तर चिस्यान कायम राख्नुहोस्।",
  },
];

const fallbackResponses: Record<Language, string[]> = {
  en: [
    "That's a great question. In general, regular inspection, balanced fertilization, and good field sanitation help keep crops healthy.",
    "I recommend checking the Crop Care section for detailed guidance on this topic, and consulting your local agricultural extension office for specific advice.",
    "For best results, combine preventive practices like crop rotation and proper spacing with regular monitoring of your plants.",
  ],
  ne: [
    "राम्रो प्रश्न। सामान्यतया नियमित निरीक्षण, सन्तुलित मल प्रयोग, र राम्रो खेत सरसफाइले बालीलाई स्वस्थ राख्न मद्दत गर्छ।",
    "यस विषयमा विस्तृत जानकारीको लागि बाली हेरचाह खण्ड हेर्न सिफारिस गर्दछु, र विशेष सल्लाहको लागि आफ्नो स्थानीय कृषि कार्यालयसँग सम्पर्क गर्नुहोस्।",
    "उत्तम नतिजाको लागि, बाली फेरबदल र उचित दूरी जस्ता रोकथाम अभ्यासलाई नियमित निगरानीसँग मिलाउनुहोस्।",
  ],
};

export function getAssistantResponse(question: string, language: Language): string {
  const normalized = question.toLowerCase();
  let bestMatch: AssistantRule | undefined;
  let bestScore = 0;

  for (const rule of rules) {
    const combinedKeywords = [...rule.enKeywords, ...rule.neKeywords];
    const score = combinedKeywords.filter((k) => normalized.includes(k.toLowerCase())).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && bestScore > 0) {
    return language === "ne" ? bestMatch.neResponse : bestMatch.enResponse;
  }

  const fallback = fallbackResponses[language];
  const index = normalized.length % fallback.length;
  return fallback[index];
}
