import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ add this
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TestTube, Upload, Leaf, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const soilTypes = [
  "Sandy",
  "Loamy",
  "Clay",
  "Sandy Loam",
  "Clay Loam",
  "Alluvial",
  "Black Soil",
  "Red Soil",
  "Laterite",
  "Arid"
];

export default function SoilAnalysis() {
  const navigate = useNavigate(); // ✅ for navigation
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [soilData, setSoilData] = useState({
    ph: 7,
    ec: 1,
    oc: 0.5,
    soilType: "Loamy",
    nitrogen: 50,
    phosphorus: 20,
    potassium: 100,
    calcium: 1000,
    magnesium: 200,
    sulphur: 10,
  });

  const handleChange = (field: string, value: any) => {
    setSoilData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // ✅ instead of alert, navigate to CropRecommendation
      navigate("/crop-recommendations", { state: { soilData } });
    }, 1500);
  };

  const renderInput = (
    id: string,
    label: string,
    type: string,
    value: any,
    unit?: string
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-gray-400 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Details about {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) =>
            handleChange(id, type === "number" ? parseFloat(e.target.value) : e.target.value)
          }
          className="flex-1"
        />
        {unit && <span className="text-sm text-gray-500">{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-900 flex items-center gap-2">
            <TestTube className="w-7 h-7" />
            New Soil Analysis
          </h1>
          <p className="text-green-600 mt-1">
            Enter your soil test results to get personalized crop recommendations.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="text-xl">Soil Report Details</CardTitle>
              <CardDescription>
                Input the values from your soil test report. If you don't have a value, leave it as default.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Soil Properties */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> Basic Soil Properties
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderInput("ph", "pH Level", "number", soilData.ph)}
                  {renderInput("ec", "Electrical Conductivity", "number", soilData.ec, "dS/m")}
                  {renderInput("oc", "Organic Carbon", "number", soilData.oc, "%")}

                  <div className="space-y-2">
                    <Label>Soil Type</Label>
                    <Select
                      value={soilData.soilType}
                      onValueChange={(val) => handleChange("soilType", val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Soil Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Macronutrients */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> Macronutrients
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderInput("nitrogen", "Nitrogen (N)", "number", soilData.nitrogen, "kg/ha")}
                  {renderInput("phosphorus", "Phosphorus (P)", "number", soilData.phosphorus, "kg/ha")}
                  {renderInput("potassium", "Potassium (K)", "number", soilData.potassium, "kg/ha")}
                </div>
              </div>

              {/* Secondary Nutrients */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5" /> Secondary Nutrients
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderInput("calcium", "Calcium (Ca)", "number", soilData.calcium, "ppm")}
                  {renderInput("magnesium", "Magnesium (Mg)", "number", soilData.magnesium, "ppm")}
                  {renderInput("sulphur", "Sulphur (S)", "number", soilData.sulphur, "ppm")}
                </div>
              </div>

              {/* Upload Report */}
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5" /> Upload Report
                </h3>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-green-500" />
                      <p className="mb-2 text-sm text-green-600">
                        {reportFile ? (
                          reportFile.name
                        ) : (
                          <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-green-500">PDF, PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.png,.jpg,.jpeg"
                    />
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                >
                  {isSaving ? "Analyzing..." : "Analyze and Get Recommendations"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
