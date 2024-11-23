// components/ColorPaletteGenerator.js

import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";
import PaletteCard from "./PaletteCard";
import MockupWindow from "./MockupWindow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ColorPaletteGenerator = () => {
  const [palettes, setPalettes] = useState([]);
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
  const [error, setError] = useState(null);
  const [colorFormat, setColorFormat] = useState("hex");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  //Submitting to the api/chat
  const handleFormSubmit = async (answers) => {
    if (isSubmitting) return; 
    setIsSubmitting(true);
    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate palettes");
      }

      const data = await response.json();

      console.log("Response data:", data);

      if (!data.palettes || !Array.isArray(data.palettes)) {
        throw new Error("Invalid palette data received");
      }

      setPalettes(data.palettes);
      setCurrentPaletteIndex(0);
    } catch (err) {
      console.error("Error generating palettes:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  //Handle the buttons for Palette navigation
  const handlePrev = () => {
    setCurrentPaletteIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPaletteIndex((prev) => Math.min(prev + 1, palettes.length - 1));
  };

  const currentPalette = palettes[currentPaletteIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64">
          <div className="sticky top-8">
            <QuestionnaireForm
              onSubmit={handleFormSubmit}
              disabled={isSubmitting}
            />
          </div>
        </aside>
        <div className="flex-1">
          {isGenerating && <p>Generating palettes...</p>}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handlePrev}
              className="p-2"
              disabled={currentPaletteIndex === 0}
              aria-label="Previous Palette"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="mx-4">
              Palette {currentPaletteIndex + 1} of {palettes.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2"
              disabled={currentPaletteIndex === palettes.length - 1}
              aria-label="Next Palette"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <MockupWindow
            colors={
              isGenerating || palettes.length === 0
                ? {
                    Background: "#f0f0f0",
                    Text: "#a0a0a0",
                    Border: "#d0d0d0",
                    Accent: "#c0c0c0",
                    Secondary: "#b0b0b0",
                  }
                : currentPalette.colors
            }
          />
          {palettes.length > 0 && (
            <PaletteCard
              palette={currentPalette}
              colorFormat={colorFormat}
              setColorFormat={setColorFormat}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
