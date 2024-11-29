// components/ColorPaletteGenerator.js

import { useState, useEffect } from "react";
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

  // New State for Locked Colors
  const [lockedColors, setLockedColors] = useState({});

  useEffect(() => {
    if (isGenerating) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isGenerating]);

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

      // Initialize lockedColors for the new palettes
      const initialLockedColors = {};
      data.palettes.forEach((palette) => {
        Object.keys(palette.colors).forEach((colorName) => {
          initialLockedColors[colorName] = false;
        });
      });
      setLockedColors(initialLockedColors);
    } catch (err) {
      console.error("Error generating palettes:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setIsGenerating(false);
    }
  };

  const handlePrev = () => {
    setCurrentPaletteIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPaletteIndex((prev) => Math.min(prev + 1, palettes.length - 1));
  };

  // Function to toggle lock state of a color
  const handleLockToggle = (colorName) => {
    setLockedColors((prev) => ({
      ...prev,
      [colorName]: !prev[colorName],
    }));
  };

  const currentPalette = palettes[currentPaletteIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 lg:sticky lg:top-8">
          <QuestionnaireForm
            onSubmit={handleFormSubmit}
            disabled={isSubmitting}
          />
        </aside>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center mb-8">AI Generated Color Palette Mockup</h1>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="relative">
            {isGenerating && (
              <div className="video-container absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10">
                <video autoPlay loop muted>
                  <source src="/gen_svg.mp4" type="video/mp4" />
                </video>
              </div>
            )}
            <div className={`mockup-container ${isGenerating ? "blur" : ""}`}>
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
            </div>
          </div>
          {!isGenerating && palettes.length > 0 && (
            <>
              <div className="flex items-center justify-center mb-4 my-4">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-gray-300 rounded-[4px] active:bg-slate-200"
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
                  className="p-2 bg-gray-300 rounded-[4px] active:bg-slate-200"
                  disabled={currentPaletteIndex === palettes.length - 1}
                  aria-label="Next Palette"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <PaletteCard
                palette={currentPalette}
                colorFormat={colorFormat}
                setColorFormat={setColorFormat}
                lockedColors={lockedColors} // Passed as prop
                handleLockToggle={handleLockToggle} // Passed as prop
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;