import { DiseaseInformation, Language } from "../types";

const diseasesEn: DiseaseInformation[] = [
  {
    id: "tomato-early-blight",
    name: "Tomato Early Blight",
    crop: "Tomato",
    overview:
      "A common fungal disease affecting tomato plants, typically appearing on older, lower leaves first and spreading upward under favorable conditions.",
    symptoms: [
      "Dark spots on older leaves",
      "Yellowing around affected areas",
      "Concentric ring patterns on leaf spots",
      "Leaf drop in severe cases",
    ],
    cause: [
      "Fungal infection associated with Alternaria species",
      "Prolonged leaf wetness and humidity",
      "Poor air circulation between plants",
    ],
    treatment: [
      "Remove severely affected leaves",
      "Maintain good airflow around plants",
      "Use appropriate disease-control treatment as advised locally",
    ],
    pesticide: ["Use locally approved fungicides according to agricultural guidance."],
    organicTreatment: [
      "Remove and dispose of infected plant material",
      "Maintain proper plant spacing and sanitation",
      "Apply neem-based sprays where locally recommended",
    ],
    prevention: [
      "Avoid prolonged leaf wetness",
      "Maintain field sanitation",
      "Inspect plants regularly",
      "Rotate crops each season",
    ],
    fertilizer: ["Maintain balanced plant nutrition with adequate potassium."],
    cropCare: [
      "Monitor plant health regularly",
      "Provide appropriate irrigation, avoiding overhead watering",
    ],
  },
  {
    id: "tomato-late-blight",
    name: "Tomato Late Blight",
    crop: "Tomato",
    overview:
      "A fast-spreading fungal-like disease that can severely damage tomato crops, especially in cool, moist conditions.",
    symptoms: [
      "Large irregular dark green to brown patches on leaves",
      "White fungal growth on leaf undersides in humid weather",
      "Rapid wilting of foliage",
    ],
    cause: [
      "Infection caused by Phytophthora infestans",
      "Cool, wet weather conditions",
    ],
    treatment: [
      "Remove and destroy infected plants promptly",
      "Improve field drainage and spacing",
      "Apply recommended fungicide treatment early",
    ],
    pesticide: ["Consult local agricultural extension for approved fungicides."],
    organicTreatment: [
      "Copper-based organic sprays where locally approved",
      "Remove infected debris from the field",
    ],
    prevention: [
      "Use resistant varieties where available",
      "Avoid overhead irrigation",
      "Ensure good field ventilation",
    ],
    fertilizer: ["Avoid excess nitrogen which encourages soft, susceptible growth."],
    cropCare: ["Inspect plants daily during humid seasons", "Stake plants for airflow"],
  },
  {
    id: "potato-late-blight",
    name: "Potato Late Blight",
    crop: "Potato",
    overview:
      "A destructive disease of potato foliage and tubers, historically responsible for major crop losses in humid regions.",
    symptoms: [
      "Water-soaked lesions on leaves",
      "Brown-black patches spreading quickly",
      "Foul odor from infected tubers",
    ],
    cause: ["Phytophthora infestans infection", "Cool and humid weather"],
    treatment: [
      "Remove affected foliage",
      "Apply recommended fungicide promptly",
      "Harvest healthy tubers carefully to avoid spread",
    ],
    pesticide: ["Use locally approved fungicides suited for potato late blight."],
    organicTreatment: ["Copper-based treatments where approved", "Improve field drainage"],
    prevention: [
      "Use certified disease-free seed potatoes",
      "Avoid dense planting",
      "Practice crop rotation",
    ],
    fertilizer: ["Maintain balanced nutrition; avoid excess nitrogen."],
    cropCare: ["Monitor fields closely during wet seasons", "Hill soil around plants properly"],
  },
  {
    id: "corn-common-rust",
    name: "Corn Common Rust",
    crop: "Corn",
    overview:
      "A fungal disease affecting maize leaves, generally more of a cosmetic and mild yield concern unless severe.",
    symptoms: [
      "Small reddish-brown pustules on leaves",
      "Pustules on both leaf surfaces",
      "Yellowing of surrounding tissue in severe cases",
    ],
    cause: ["Puccinia sorghi fungal infection", "Moderate temperatures with high humidity"],
    treatment: [
      "Apply fungicide if infection is severe",
      "Remove heavily infected leaves where practical",
    ],
    pesticide: ["Consult local guidance for approved fungicides for maize rust."],
    organicTreatment: ["Maintain field sanitation", "Encourage airflow through proper spacing"],
    prevention: [
      "Plant resistant hybrid varieties",
      "Avoid excessive plant density",
      "Rotate crops where feasible",
    ],
    fertilizer: ["Maintain balanced nitrogen and potassium levels."],
    cropCare: ["Scout fields regularly during the growing season"],
  },
  {
    id: "apple-scab",
    name: "Apple Scab",
    crop: "Apple",
    overview:
      "A widespread fungal disease of apple trees affecting leaves and fruit, reducing fruit quality and yield.",
    symptoms: [
      "Olive-green to black spots on leaves",
      "Scabby, corky lesions on fruit",
      "Premature leaf drop",
    ],
    cause: ["Venturia inaequalis fungal infection", "Wet spring weather"],
    treatment: [
      "Apply fungicide sprays at recommended intervals",
      "Remove fallen infected leaves in autumn",
    ],
    pesticide: ["Use orchard-approved fungicides according to local guidance."],
    organicTreatment: ["Sulfur-based organic sprays where approved", "Rake and destroy fallen leaves"],
    prevention: [
      "Choose scab-resistant apple varieties",
      "Prune trees for better air circulation",
      "Avoid overhead irrigation",
    ],
    fertilizer: ["Maintain balanced orchard nutrition program."],
    cropCare: ["Prune annually", "Monitor during wet spring conditions"],
  },
];

const diseasesNe: DiseaseInformation[] = [
  {
    id: "tomato-early-blight",
    name: "Tomato Early Blight",
    crop: "टमाटर",
    overview:
      "टमाटरका बोटमा देखिने सामान्य फफूंदीजन्य रोग, जुन प्रायः पुराना, तल्ला पातहरूमा पहिले देखिन्छ र अनुकूल अवस्थामा माथितिर फैलिन्छ।",
    symptoms: [
      "पुराना पातहरूमा गाढा दागहरू",
      "प्रभावित क्षेत्रको वरिपरि पहेंलोपन",
      "पातका दागहरूमा वृत्ताकार तह",
      "गम्भीर अवस्थामा पात झर्ने",
    ],
    cause: [
      "Alternaria प्रजातिसँग सम्बन्धित फफूंदी संक्रमण",
      "पातमा लामो समयसम्म चिस्यान र उच्च आर्द्रता",
      "बोटहरू बीच हावा आवतजावतको कमी",
    ],
    treatment: [
      "गम्भीर रूपमा प्रभावित पातहरू हटाउनुहोस्",
      "बोटहरू वरिपरि राम्रो हावा आवतजावत कायम राख्नुहोस्",
      "स्थानीय सल्लाह अनुसार उपयुक्त रोग नियन्त्रण उपचार प्रयोग गर्नुहोस्",
    ],
    pesticide: ["कृषि मार्गदर्शन अनुसार स्थानीय रूपमा स्वीकृत फफूंदीनाशक प्रयोग गर्नुहोस्।"],
    organicTreatment: [
      "संक्रमित बिरुवाका भागहरू हटाई नष्ट गर्नुहोस्",
      "उचित दूरी र सरसफाइ कायम राख्नुहोस्",
      "स्थानीय रूपमा सिफारिस गरिएमा नीम आधारित स्प्रे प्रयोग गर्नुहोस्",
    ],
    prevention: [
      "पातमा लामो समय चिस्यान नराख्नुहोस्",
      "खेतबारीको सरसफाइ कायम राख्नुहोस्",
      "बोटहरू नियमित रूपमा निरीक्षण गर्नुहोस्",
      "हरेक सिजनमा बाली फेरबदल गर्नुहोस्",
    ],
    fertilizer: ["पर्याप्त पोटासियमसहित सन्तुलित बिरुवा पोषण कायम राख्नुहोस्।"],
    cropCare: [
      "बोटको स्वास्थ्य नियमित रूपमा निगरानी गर्नुहोस्",
      "माथिबाट पानी नहालीकन उपयुक्त सिंचाइ गर्नुहोस्",
    ],
  },
  {
    id: "tomato-late-blight",
    name: "Tomato Late Blight",
    crop: "टमाटर",
    overview:
      "चाँडै फैलिने फफूंदी जस्तै रोग जसले चिसो र आर्द्र मौसममा टमाटरको बालीलाई गम्भीर क्षति पुर्‍याउन सक्छ।",
    symptoms: [
      "पातमा ठूला अनियमित गाढा हरियोदेखि खैरो दागहरू",
      "आर्द्र मौसममा पातको तल्लो भागमा सेतो फफूंदी वृद्धि",
      "पातहरू छिटो ओइलाउने",
    ],
    cause: [
      "Phytophthora infestans बाट हुने संक्रमण",
      "चिसो, आर्द्र मौसमी अवस्था",
    ],
    treatment: [
      "संक्रमित बोटहरू तुरुन्तै हटाई नष्ट गर्नुहोस्",
      "खेतको जलनिकास र दूरी सुधार गर्नुहोस्",
      "सिफारिस गरिएको फफूंदीनाशक उपचार समयमै लगाउनुहोस्",
    ],
    pesticide: ["स्वीकृत फफूंदीनाशकको लागि स्थानीय कृषि कार्यालयसँग सल्लाह लिनुहोस्।"],
    organicTreatment: [
      "स्थानीय रूपमा स्वीकृत भएमा तामा आधारित जैविक स्प्रे",
      "खेतबाट संक्रमित फोहोर हटाउनुहोस्",
    ],
    prevention: [
      "उपलब्ध भएमा प्रतिरोधी जातहरू प्रयोग गर्नुहोस्",
      "माथिबाट सिंचाइ नगर्नुहोस्",
      "खेतमा राम्रो हावा आवतजावत सुनिश्चित गर्नुहोस्",
    ],
    fertilizer: ["नरम र संक्रमणयोग्य वृद्धि बढाउने अत्यधिक नाइट्रोजन नराख्नुहोस्।"],
    cropCare: ["आर्द्र सिजनमा दैनिक बोट निरीक्षण गर्नुहोस्", "हावा आवतजावतको लागि बोटलाई सहारा दिनुहोस्"],
  },
  {
    id: "potato-late-blight",
    name: "Potato Late Blight",
    crop: "आलु",
    overview:
      "आलुका पात र गेडाहरूलाई हानि पुर्‍याउने विनाशकारी रोग, जसले आर्द्र क्षेत्रहरूमा ऐतिहासिक रूपमा ठूलो बाली नोक्सानी गराएको छ।",
    symptoms: [
      "पातमा पानी सोसिएका दागहरू",
      "छिटो फैलिने खैरो-कालो दागहरू",
      "संक्रमित गेडाबाट दुर्गन्ध",
    ],
    cause: ["Phytophthora infestans संक्रमण", "चिसो र आर्द्र मौसम"],
    treatment: [
      "प्रभावित पातहरू हटाउनुहोस्",
      "सिफारिस गरिएको फफूंदीनाशक समयमै लगाउनुहोस्",
      "फैलावट रोक्न स्वस्थ गेडाहरू सावधानीपूर्वक भित्र्याउनुहोस्",
    ],
    pesticide: ["आलुको लेट ब्लाइटको लागि स्थानीय रूपमा स्वीकृत फफूंदीनाशक प्रयोग गर्नुहोस्।"],
    organicTreatment: ["स्वीकृत भएमा तामा आधारित उपचार", "खेतको जलनिकास सुधार गर्नुहोस्"],
    prevention: [
      "प्रमाणित रोगमुक्त बीउ आलु प्रयोग गर्नुहोस्",
      "घना रोपाइँ नगर्नुहोस्",
      "बाली फेरबदल अभ्यास गर्नुहोस्",
    ],
    fertilizer: ["सन्तुलित पोषण कायम राख्नुहोस्; अत्यधिक नाइट्रोजनबाट बच्नुहोस्।"],
    cropCare: ["आर्द्र सिजनमा खेतको नजिकबाट निगरानी गर्नुहोस्", "बोट वरिपरि माटो उचित रूपमा उठाउनुहोस्"],
  },
  {
    id: "corn-common-rust",
    name: "Corn Common Rust",
    crop: "मकै",
    overview:
      "मकैका पातलाई असर गर्ने फफूंदीजन्य रोग, जुन सामान्यतया गम्भीर नभएसम्म सौन्दर्य र सामान्य उत्पादनसँग मात्र सम्बन्धित हुन्छ।",
    symptoms: [
      "पातमा साना रातो-खैरो फोकाहरू",
      "पातका दुवैतिर फोकाहरू",
      "गम्भीर अवस्थामा वरिपरिको तन्तु पहेंलो हुने",
    ],
    cause: ["Puccinia sorghi फफूंदी संक्रमण", "मध्यम तापक्रम र उच्च आर्द्रता"],
    treatment: [
      "संक्रमण गम्भीर भएमा फफूंदीनाशक लगाउनुहोस्",
      "सम्भव भएसम्म धेरै संक्रमित पातहरू हटाउनुहोस्",
    ],
    pesticide: ["मकैको रस्टको लागि स्वीकृत फफूंदीनाशकको लागि स्थानीय मार्गदर्शन लिनुहोस्।"],
    organicTreatment: ["खेतको सरसफाइ कायम राख्नुहोस्", "उचित दूरी मार्फत हावा आवतजावत बढाउनुहोस्"],
    prevention: [
      "प्रतिरोधी हाइब्रिड जातहरू रोप्नुहोस्",
      "अत्यधिक घना रोपाइँबाट बच्नुहोस्",
      "सम्भव भएमा बाली फेरबदल गर्नुहोस्",
    ],
    fertilizer: ["सन्तुलित नाइट्रोजन र पोटासियम स्तर कायम राख्नुहोस्।"],
    cropCare: ["बढ्दो सिजनमा नियमित रूपमा खेत निरीक्षण गर्नुहोस्"],
  },
  {
    id: "apple-scab",
    name: "Apple Scab",
    crop: "स्याउ",
    overview:
      "स्याउका रूखहरूमा व्यापक रूपमा देखिने फफूंदीजन्य रोग, जसले पात र फललाई असर गरी गुणस्तर र उत्पादन घटाउँछ।",
    symptoms: [
      "पातमा जैतुनी-हरियोदेखि कालो दागहरू",
      "फलमा खस्रा, कड्किएका दागहरू",
      "समयभन्दा अगाडि पात झर्ने",
    ],
    cause: ["Venturia inaequalis फफूंदी संक्रमण", "आर्द्र वसन्त मौसम"],
    treatment: [
      "सिफारिस गरिएको अन्तरालमा फफूंदीनाशक स्प्रे गर्नुहोस्",
      "शरद ऋतुमा झरेका संक्रमित पातहरू हटाउनुहोस्",
    ],
    pesticide: ["स्थानीय मार्गदर्शन अनुसार बगैंचामा स्वीकृत फफूंदीनाशक प्रयोग गर्नुहोस्।"],
    organicTreatment: ["स्वीकृत भएमा सल्फर आधारित जैविक स्प्रे", "झरेका पातहरू बटुली नष्ट गर्नुहोस्"],
    prevention: [
      "स्क्याब-प्रतिरोधी स्याउ जातहरू छनौट गर्नुहोस्",
      "राम्रो हावा आवतजावतको लागि रूखहरू काटछाँट गर्नुहोस्",
      "माथिबाट सिंचाइ नगर्नुहोस्",
    ],
    fertilizer: ["सन्तुलित बगैंचा पोषण कार्यक्रम कायम राख्नुहोस्।"],
    cropCare: ["वार्षिक रूपमा काटछाँट गर्नुहोस्", "आर्द्र वसन्त अवस्थामा निगरानी गर्नुहोस्"],
  },
];

export function getDiseases(language: Language): DiseaseInformation[] {
  return language === "ne" ? diseasesNe : diseasesEn;
}

export function findDiseaseByName(name: string): DiseaseInformation | undefined {
  const normalized = name.trim().toLowerCase();
  return diseasesEn.find((d) => d.name.toLowerCase() === normalized);
}

export function findDiseaseById(id: string, language: Language): DiseaseInformation | undefined {
  return getDiseases(language).find((d) => d.id === id);
}
