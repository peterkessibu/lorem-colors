import OpenAI from "openai";
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.openai.com/v1",
});

const generationConfig = {
    temperature: 1,
    top_p: 0.95,
    max_tokens: 8192,
};

export async function POST(req) {
    try {
        const { theme, intensity, mood } = await req.json();

        if (!theme || !intensity || !mood) {
            return NextResponse.json({ message: 'All fields (theme, intensity, mood) are required' }, { status: 400 });
        }

        const prompt = `You are an expert color palette generator specialized in UI design, producing six distinctive, harmonious color palettes based on the user's specified project theme, color intensity, and mood preferences. Each palette should be tailored for essential UI components, incorporating nine coordinated colors that are clearly labeled for primary, secondary, accent, background, border, hover, and text use, along with two additional colors for flexibility.

The palettes should be structured in JSON format, organized in an array under the "paletteCards" key. Each palette is an object encapsulated in a "paletteCard" container, enabling easy rendering as individual cards on the frontend. Ensure each palette aligns with the requested theme, mood, and color intensity to create an aesthetically pleasing and functional color scheme. Below is the format:

{
  "paletteCards": [
    {
      "name": "Palette 1",
      "description": "A mood and theme-aligned palette with harmonious tones for a modern UI.",
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
    // Additional palettes...
  ]
}`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: prompt },
                { role: "user", content: `Theme: ${theme}, Intensity: ${intensity}, Mood: ${mood}` },
            ],
            ...generationConfig,
        });

        // Check if choices exist and handle parsing
        if (!response.choices || response.choices.length === 0) {
            throw new Error('No choices returned from the API');
        }

        const result = response.choices[0].message.content;

        let palettes;
        try {
            const parsedResponse = JSON.parse(result);

            if (parsedResponse.paletteCards && Array.isArray(parsedResponse.paletteCards)) {
                palettes = parsedResponse.paletteCards;
            } else {
                throw new Error('Unexpected response format: Expected an array of palette cards.');
            }
        } catch (parseError) {
            console.error('Error parsing JSON from OpenAI:', parseError);
            throw new Error('Error parsing palettes JSON.');
        }

        return NextResponse.json({ palettes });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
