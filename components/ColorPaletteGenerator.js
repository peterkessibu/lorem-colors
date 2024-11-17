"use client";

import { useState } from "react";
import QuestionnaireForm from "./QuestionnaireForm";
import PaletteCard from "./PaletteCard";

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);
  const [error, setError] = useState(null);

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
      setError(null);
    } catch (error) {
      console.error("Error generating palettes:", error);
      setPalettes([]);
      setError(error.message);
    }
  };

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
            <div className="grid grid-cols-1 gap-2">
              {palettes.map((palette, index) => (
                <PaletteCard key={index} palette={palette} index={index} />
              ))}
            </div>
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
