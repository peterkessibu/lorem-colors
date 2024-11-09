import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-palette",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export async function POST(req) {
    try {
        const { theme, intensity, mood } = await req.json();

        if (!theme || !intensity || !mood) {
            return NextResponse.json({ message: 'All fields (theme, intensity, mood) are required' }, { status: 400 });
        }

        const chatSession = model.startChat({
            generationConfig,
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `You are a professional color palette generator for UI design. Based on the user's project theme, color intensity, and mood preferences, create six unique color palettes. Each palette should contain nine cohesive colors tailored for essential UI elements, specifically labeled as primary, secondary, accent, background, border, hover, and text colors.

The output format should be JSON and structured as an array of objects, with each object representing one palette grouped within a "paletteCard" container, making it easy to render each color set in individual cards on the frontend. Each color set should be relevant to the chosen theme, intensity, and mood. Here’s the format:

{
  "paletteCards": [
    {
      "name": "Palette 1",
      "colors": [
        { "name": "Primary", "hex": "#color1" },
        { "name": "Secondary", "hex": "#color2" },
        { "name": "Accent", "hex": "#color3" },
        { "name": "Background", "hex": "#color4" },
        { "name": "Border", "hex": "#color5" },
        { "name": "Hover", "hex": "#color6" },
        { "name": "Text", "hex": "#color7" },
        { "name": "Additional1", "hex": "#color8" },
        { "name": "Additional2", "hex": "#color9" }
      ]
    },
    // More palettes...
  ]
}

Each palette should be visually cohesive and harmonized with the specified theme and mood. Ensure that the generated colors are both aesthetic and functional for the specified UI elements.`
                        }
                    ],
                }
            ],
        });

        const result = await chatSession.sendMessage({ theme, intensity, mood });

        let palettes;
        try {
            const responseText = await result.response.text();
            const parsedResponse = JSON.parse(responseText);

            // Ensure the response has the expected format
            if (parsedResponse.paletteCards && Array.isArray(parsedResponse.paletteCards)) {
                palettes = parsedResponse.paletteCards;
            } else {
                throw new Error('Unexpected response format. Expected an array of palette cards.');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            throw new Error('Error parsing palettes JSON.');
        }

        return NextResponse.json({ palettes });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
