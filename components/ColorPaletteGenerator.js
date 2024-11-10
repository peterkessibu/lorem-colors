"use client";

import { useState } from "react";
import QuestionnaireForm from "../../components/QuestionnaireForm";
import PaletteCard from "../../components/PaletteCard";
import MockupWindow from "../../components/MockupWindow";
import Slider from "../../components/Slider";

export default function ColorPaletteGenerator() {
    const [palettes, setPalettes] = useState([]);
    const [currentPaletteIndex, setCurrentPaletteIndex] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmit = async (answers) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate palettes');
            }

            if (!data.palettes || !Array.isArray(data.palettes)) {
                throw new Error('Invalid palette data received');
            }

            setPalettes(data.palettes);
            setCurrentPaletteIndex(0);
            setError(null);

        } catch (error) {
            console.error('Error generating palettes:', error);
            setPalettes([]);
            setError(error.message);
        }
    };

    const handleNext = () => {
        setCurrentPaletteIndex((prevIndex) => (prevIndex + 1) % palettes.length);
    };

    const handlePrev = () => {
        setCurrentPaletteIndex((prevIndex) => (prevIndex - 1 + palettes.length) % palettes.length);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">AI-Driven Color Palette Generator</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3">
                    <div className="sticky top-8">
                        <QuestionnaireForm onSubmit={handleSubmit} />
                    </div>
                </div>
                <div className="w-full lg:w-2/3">
                    {error && (
                        <div className="text-red-500 text-center mb-4">
                            {error}
                        </div>
                    )}
                    {palettes.length > 0 ? (
                        <>
                            <MockupWindow colors={palettes[currentPaletteIndex].colors} />
                            <Slider
                                palettes={palettes}
                                currentPaletteIndex={currentPaletteIndex}
                                handleNext={handleNext}
                                handlePrev={handlePrev}
                            />
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-xl text-gray-500">Generate palettes to see them here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}