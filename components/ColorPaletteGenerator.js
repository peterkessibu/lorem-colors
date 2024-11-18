"use client";

import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";
import PaletteCard from "./PaletteCard";
import MockupWindow from "./MockupWindow";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);
  const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
  const [error, setError] = useState(null);
  const [colorFormat, setColorFormat] = useState("hex");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (answers) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    setIsGenerating(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate palettes");
      }

      if (!data.palettes || !Array.isArray(data.palettes)) {
        throw new Error("Invalid palette data received");
      }

      setPalettes(data.palettes);
      setCurrentPaletteIndex(0);
      setError(null);
    } catch (error) {
      console.error("Error generating palettes:", error);
      setPalettes([]);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    setCurrentPaletteIndex((prevIndex) => (prevIndex + 1) % palettes.length);
  };

  const handlePrev = () => {
    setCurrentPaletteIndex(
      (prevIndex) => (prevIndex - 1 + palettes.length) % palettes.length,
    );
  };

  const handlePaletteChange = (updatedPalette) => {
    const updatedPalettes = [...palettes];
    updatedPalettes[currentPaletteIndex] = updatedPalette;
    setPalettes(updatedPalettes);
  };

  const currentPalette = palettes[currentPaletteIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-52">
          <div className="sticky top-8">
            <QuestionnaireForm onSubmit={handleSubmit} disabled={isSubmitting} />
          </div>
        </aside>
        <div className="flex-1">
          {isSubmitting && <p>Generating palettes...</p>}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <MockupWindow
            colors={
              isGenerating || palettes.length === 0
                ? { Background: "#f0f0f0", Text: "#a0a0a0", Border: "#d0d0d0", Accent: "#c0c0c0", Secondary: "#b0b0b0" }
                : currentPalette.colors
            }
          />
          {palettes.length > 0 && (
            <>
              {/* Navigation Arrows */}
              <div className="flex items-center justify-center mb-4">
                <button onClick={handlePrev} className="p-2">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="mx-4">
                  Palette {currentPaletteIndex + 1} of {palettes.length}
                </span>
                <button onClick={handleNext} className="p-2">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Palette Card */}
              <PaletteCard
                palette={currentPalette}
                onPaletteChange={handlePaletteChange}
                colorFormat={colorFormat}
                setColorFormat={setColorFormat}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ) 
};