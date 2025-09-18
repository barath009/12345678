import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sprout } from "lucide-react";

const CropRecommendation = () => {
  const location = useLocation();
  const soilData = location.state?.soilData || {
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    organicCarbon: 0.7,
    soilType: "Loam",
  };

  // 🔥 Logic for crop recommendation with status levels
  const getRecommendations = () => {
    const recs: any[] = [];

    // Wheat
    if (soilData.ph >= 6.5 && soilData.ph <= 7.0 && soilData.nitrogen >= 60) {
      recs.push({
        name: "Wheat",
        yield: "4–7 tons/hectare",
        duration: "120–150 days",
        status: "Excellent",
        reasons: [
          `Neutral pH ${soilData.ph} is perfect for wheat`,
          "High nitrogen ensures strong protein content",
          "Alluvial/loamy soil improves productivity",
        ],
        tips: [
          "Plant in Rabi season (Oct–Dec)",
          "Irrigate at crown root and heading stages",
        ],
      });
    } else if (soilData.ph >= 6 && soilData.ph <= 7.5) {
      recs.push({
        name: "Wheat",
        yield: "3–6 tons/hectare",
        duration: "120–150 days",
        status: "Best",
        reasons: [
          "pH moderately suitable",
          "Nitrogen levels acceptable with fertilizers",
          "Adaptable to loam and clay soils",
        ],
        tips: ["Apply urea in split doses", "Avoid waterlogging"],
      });
    } else {
      recs.push({
        name: "Wheat",
        yield: "2–4 tons/hectare",
        duration: "120–150 days",
        status: "Less Suggested",
        reasons: [
          "pH outside optimal range",
          "Nitrogen below requirement",
          "Low soil fertility for high yield",
        ],
        tips: ["Use fertilizers", "Add organic manure"],
      });
    }

    // Rice
    if (soilData.ph >= 5.5 && soilData.ph <= 7.5 && soilData.potassium >= 30) {
      recs.push({
        name: "Rice",
        yield: "3–6 tons/hectare",
        duration: "100–130 days",
        status: "Excellent",
        reasons: [
          "Slightly acidic to neutral pH suitable",
          "Potassium supports grain filling",
          "Loamy/clay soil retains water well",
        ],
        tips: [
          "Maintain standing water during vegetative stage",
          "Apply organic manure before transplanting",
        ],
      });
    } else if (soilData.ph >= 5 && soilData.ph <= 8) {
      recs.push({
        name: "Rice",
        yield: "2–4 tons/hectare",
        duration: "100–130 days",
        status: "Best",
        reasons: [
          "pH acceptable but not ideal",
          "Fertility moderate",
          "Irrigation management needed",
        ],
        tips: ["Add potash fertilizer", "Ensure irrigation channels"],
      });
    } else {
      recs.push({
        name: "Rice",
        yield: "1–2 tons/hectare",
        duration: "100–130 days",
        status: "Poor",
        reasons: [
          "pH unsuitable for rice roots",
          "Soil drainage not ideal",
          "Fertility below requirement",
        ],
        tips: ["Not recommended unless improved with fertilizers"],
      });
    }

    // Cotton
    if (soilData.ph >= 7.5 && soilData.ph <= 8.0 && soilData.soilType === "Black") {
      recs.push({
        name: "Cotton",
        yield: "2–3 tons/hectare",
        duration: "150–180 days",
        status: "Excellent",
        reasons: [
          "Black soil retains moisture",
          "Slightly alkaline pH supports cotton roots",
          "NPK balance adequate",
        ],
        tips: [
          "Sow in June–July",
          "Use Bt-cotton varieties for pest resistance",
        ],
      });
    } else if (soilData.ph >= 7 && soilData.ph <= 8.5) {
      recs.push({
        name: "Cotton",
        yield: "1.5–2 tons/hectare",
        duration: "150–180 days",
        status: "Best",
        reasons: [
          "Soil fertility manageable",
          "pH slightly alkaline but tolerable",
        ],
        tips: ["Add nitrogen fertilizer", "Use drip irrigation"],
      });
    } else {
      recs.push({
        name: "Cotton",
        yield: "1–1.5 tons/hectare",
        duration: "150–180 days",
        status: "Less Suggested",
        reasons: ["Soil unsuitable for cotton", "Drainage issues likely"],
        tips: ["Not ideal – switch to pulses or bajra"],
      });
    }

    // Bajra (Pearl Millet) for alkaline/poor soils
    if (soilData.ph >= 8 && soilData.ph <= 9) {
      recs.push({
        name: "Bajra (Pearl Millet)",
        yield: "1–2 tons/hectare",
        duration: "70–90 days",
        status: "Excellent",
        reasons: [
          "Tolerates alkaline and desert soils",
          "Low fertilizer requirement",
          "Short duration crop",
        ],
        tips: ["Best for arid zones", "Sow with onset of monsoon"],
      });
    }

    return recs;
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-green-900 text-white py-12 px-6 text-center relative">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-2">
          <Sprout className="w-8 h-8 text-lime-300" />
          Smart Crop Advisor
        </h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          Get personalized crop recommendations based on your soil analysis.
        </p>
        <p className="mt-2 text-sm text-lime-200">
          🌱 Science-backed • Sustainable • Profitable
        </p>
      </div>

      <main className="flex-grow bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            to="/soil-analysis"
            className="text-green-700 underline mb-4 inline-block"
          >
            ← Back to Soil Analysis
          </Link>

          {/* Soil Profile Summary */}
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                Your Soil Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-sm text-gray-500">pH Level</p>
                <p className="font-bold text-lg">{soilData.ph}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nitrogen</p>
                <p className="font-bold text-lg">{soilData.nitrogen} ppm</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phosphorus</p>
                <p className="font-bold text-lg">{soilData.phosphorus} ppm</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Potassium</p>
                <p className="font-bold text-lg">{soilData.potassium} ppm</p>
              </div>
            </CardContent>
          </Card>

          {/* Crop Recommendations */}
          <h2 className="text-2xl font-semibold text-center text-green-800 mb-6">
            Crop Recommendations
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Based on your soil analysis, here are the most suitable crops
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((crop, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-600" />
                      {crop.name}
                    </CardTitle>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        crop.status === "Excellent"
                          ? "bg-green-200 text-green-800"
                          : crop.status === "Best"
                          ? "bg-lime-200 text-lime-800"
                          : crop.status === "Less Suggested"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {crop.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 text-sm text-gray-600 mb-4">
                    <span>🌾 {crop.yield}</span>
                    <span>⏳ {crop.duration}</span>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold text-gray-800">
                      Why this crop works:
                    </p>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {crop.reasons.map((reason: string, i: number) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">🌱 Planting Tips:</p>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {crop.tips.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 text-center">
        <h3 className="flex justify-center items-center gap-2 font-semibold">
          <Sprout className="w-5 h-5 text-lime-300" />
          Smart Crop Advisor
        </h3>
        <p className="text-sm mt-1 text-lime-200">
          Empowering farmers with data-driven agricultural insights
        </p>
      </footer>
    </div>
  );
};

export default CropRecommendation;
