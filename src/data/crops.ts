import { CropInformation, Language } from "../types";

const cropsEn: CropInformation[] = [
  {
    id: "tomato",
    name: "Tomato",
    overview:
      "A widely grown warm-season crop, sensitive to fungal diseases in humid conditions but generally productive with proper care.",
    watering: "Water at the base regularly, keeping soil evenly moist but avoiding waterlogging.",
    fertilizer: "Use balanced fertilizer with adequate potassium during fruiting stages.",
    commonDiseaseRisks: ["Early Blight", "Late Blight", "Leaf Curl Virus"],
    prevention: [
      "Rotate crops each season",
      "Avoid overhead watering",
      "Provide adequate plant spacing",
    ],
    generalCare: [
      "Stake or cage plants for support",
      "Prune lower leaves for airflow",
      "Inspect plants weekly",
    ],
  },
  {
    id: "potato",
    name: "Potato",
    overview:
      "A staple root crop that thrives in cool climates but is vulnerable to blight in wet, humid weather.",
    watering: "Maintain consistent soil moisture, especially during tuber formation.",
    fertilizer: "Apply balanced fertilizer with moderate nitrogen and higher potassium.",
    commonDiseaseRisks: ["Late Blight", "Early Blight", "Common Scab"],
    prevention: [
      "Use certified disease-free seed potatoes",
      "Practice crop rotation",
      "Avoid dense planting",
    ],
    generalCare: [
      "Hill soil around plants as they grow",
      "Monitor foliage during wet seasons",
      "Harvest carefully to avoid tuber damage",
    ],
  },
  {
    id: "corn",
    name: "Corn / Maize",
    overview:
      "A staple cereal crop grown widely, generally resilient but susceptible to certain rust and blight diseases.",
    watering: "Requires consistent moisture, particularly during tasseling and silking stages.",
    fertilizer: "Apply nitrogen-rich fertilizer in split doses through the growing season.",
    commonDiseaseRisks: ["Common Rust", "Leaf Blight", "Stalk Rot"],
    prevention: [
      "Plant resistant hybrid varieties",
      "Avoid overly dense planting",
      "Rotate with non-cereal crops",
    ],
    generalCare: [
      "Scout fields regularly for pests and disease",
      "Ensure proper drainage",
      "Control weeds early in the season",
    ],
  },
  {
    id: "apple",
    name: "Apple",
    overview:
      "A perennial fruit tree crop requiring consistent orchard management to prevent common fungal diseases.",
    watering: "Deep, infrequent watering is preferred over frequent shallow watering.",
    fertilizer: "Apply balanced orchard fertilizer in early spring based on soil testing.",
    commonDiseaseRisks: ["Apple Scab", "Fire Blight", "Powdery Mildew"],
    prevention: [
      "Choose disease-resistant varieties",
      "Prune annually for airflow",
      "Remove fallen leaves and fruit debris",
    ],
    generalCare: [
      "Prune during dormant season",
      "Monitor during wet spring weather",
      "Thin fruit for better quality",
    ],
  },
];

const cropsNe: CropInformation[] = [
  {
    id: "tomato",
    name: "टमाटर",
    overview:
      "व्यापक रूपमा खेती गरिने न्यानो मौसमको बाली, आर्द्र अवस्थामा फफूंदीजन्य रोगप्रति संवेदनशील तर उचित हेरचाहमा राम्रो उत्पादन दिने।",
    watering: "जरामा नियमित पानी दिनुहोस्, माटो समान रूपमा ओसिलो राख्नुहोस् तर पानी जम्न नदिनुहोस्।",
    fertilizer: "फल लाग्ने अवस्थामा पर्याप्त पोटासियमसहित सन्तुलित मल प्रयोग गर्नुहोस्।",
    commonDiseaseRisks: ["अर्ली ब्लाइट", "लेट ब्लाइट", "लिफ कर्ल भाइरस"],
    prevention: [
      "हरेक सिजनमा बाली फेरबदल गर्नुहोस्",
      "माथिबाट पानी नहाल्नुहोस्",
      "बोटहरू बीच पर्याप्त दूरी राख्नुहोस्",
    ],
    generalCare: [
      "सहाराको लागि बोटलाई काठ वा पिंजरा दिनुहोस्",
      "हावा आवतजावतको लागि तल्ला पातहरू काटछाँट गर्नुहोस्",
      "साप्ताहिक रूपमा बोट निरीक्षण गर्नुहोस्",
    ],
  },
  {
    id: "potato",
    name: "आलु",
    overview:
      "चिसो हावापानीमा राम्रो हुने प्रमुख कन्दमूल बाली, तर आर्द्र मौसममा ब्लाइट रोगप्रति संवेदनशील।",
    watering: "विशेष गरी गेडा बन्ने बेलामा माटोमा निरन्तर चिस्यान कायम राख्नुहोस्।",
    fertilizer: "मध्यम नाइट्रोजन र बढी पोटासियमसहित सन्तुलित मल प्रयोग गर्नुहोस्।",
    commonDiseaseRisks: ["लेट ब्लाइट", "अर्ली ब्लाइट", "कमन स्क्याब"],
    prevention: [
      "प्रमाणित रोगमुक्त बीउ आलु प्रयोग गर्नुहोस्",
      "बाली फेरबदल अभ्यास गर्नुहोस्",
      "घना रोपाइँ नगर्नुहोस्",
    ],
    generalCare: [
      "बोट बढ्दै जाँदा वरिपरि माटो उठाउनुहोस्",
      "आर्द्र सिजनमा पातको निगरानी गर्नुहोस्",
      "गेडालाई क्षति नपुर्‍याई सावधानीपूर्वक झिक्नुहोस्",
    ],
  },
  {
    id: "corn",
    name: "मकै",
    overview:
      "व्यापक रूपमा खेती गरिने प्रमुख अन्न बाली, सामान्यतया बलियो तर केही रस्ट र ब्लाइट रोगप्रति संवेदनशील।",
    watering: "विशेष गरी फूल लाग्ने बेलामा निरन्तर चिस्यान आवश्यक पर्छ।",
    fertilizer: "बढ्दो सिजनभरि विभाजित मात्रामा नाइट्रोजनयुक्त मल प्रयोग गर्नुहोस्।",
    commonDiseaseRisks: ["कमन रस्ट", "लिफ ब्लाइट", "स्टक रट"],
    prevention: [
      "प्रतिरोधी हाइब्रिड जातहरू रोप्नुहोस्",
      "अत्यधिक घना रोपाइँबाट बच्नुहोस्",
      "अन्न बाहेकका बालीसँग फेरबदल गर्नुहोस्",
    ],
    generalCare: [
      "कीरा र रोगको लागि नियमित रूपमा खेत जाँच गर्नुहोस्",
      "उचित जलनिकास सुनिश्चित गर्नुहोस्",
      "सिजनको सुरुमै झारपात नियन्त्रण गर्नुहोस्",
    ],
  },
  {
    id: "apple",
    name: "स्याउ",
    overview:
      "सामान्य फफूंदीजन्य रोगबाट बच्न निरन्तर बगैंचा व्यवस्थापन आवश्यक पर्ने बहुवर्षीय फलफूल बाली।",
    watering: "पटक-पटक थोरै पानी दिनुभन्दा गहिरो र कम पटक पानी दिनु उपयुक्त हुन्छ।",
    fertilizer: "माटो परीक्षणको आधारमा वसन्त सुरुमा सन्तुलित बगैंचा मल प्रयोग गर्नुहोस्।",
    commonDiseaseRisks: ["एप्पल स्क्याब", "फायर ब्लाइट", "पाउडरी मिल्ड्यु"],
    prevention: [
      "रोग-प्रतिरोधी जातहरू छनौट गर्नुहोस्",
      "हावा आवतजावतको लागि वार्षिक काटछाँट गर्नुहोस्",
      "झरेका पात र फलका फोहोर हटाउनुहोस्",
    ],
    generalCare: [
      "सुषुप्त सिजनमा काटछाँट गर्नुहोस्",
      "आर्द्र वसन्त मौसममा निगरानी गर्नुहोस्",
      "राम्रो गुणस्तरको लागि फल पातलो पार्नुहोस्",
    ],
  },
];

export function getCrops(language: Language): CropInformation[] {
  return language === "ne" ? cropsNe : cropsEn;
}

export function findCropById(id: string, language: Language): CropInformation | undefined {
  return getCrops(language).find((c) => c.id === id);
}
