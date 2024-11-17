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

  const handleSubmit = async (answers) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

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
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8">
            <QuestionnaireForm onSubmit={handleSubmit} />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {palettes.length > 0 ? (
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

              {/* Mockup Window */}
              <MockupWindow
                colors={currentPalette.colors}
              />

              {/* Palette Card */}
              <PaletteCard
                palette={currentPalette}
                onPaletteChange={handlePaletteChange}
                colorFormat={colorFormat}
                setColorFormat={setColorFormat}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">
                Generate palettes to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}