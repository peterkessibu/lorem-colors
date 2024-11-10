// app/api/chat/route.js

import Together from 'together-ai';
import { NextResponse } from 'next/server';

const together = new Together();

const generationConfig = {
    temperature: 0.7,
    top_p: 0.95,
    max_tokens: 8192,
};

export async function POST(req) {
    try {
        const { theme, intensity, mood } = await req.json();
        if (!theme || !intensity || !mood) {
            return NextResponse.json(
                { message: 'All fields (theme, intensity, mood) are required' },
                { status: 400 }
            );
        }

        const prompt = `Generate 6 color palettes for a ${theme} website with ${intensity} intensity and ${mood} mood.
        
Return only valid JSON in the exact format below, without any additional text or explanation:

{
  "paletteCards": [
    {
      "name": "Palette 1",
      "description": "Brief description",
      "colors": [
        { "name": "Primary", "hex": "#XXXXXX" },
        { "name": "Secondary", "hex": "#XXXXXX" },
        { "name": "Accent", "hex": "#XXXXXX" },
        { "name": "Background", "hex": "#XXXXXX" },
        { "name": "Border", "hex": "#XXXXXX" },
        { "name": "Hover", "hex": "#XXXXXX" },
        { "name": "Text", "hex": "#XXXXXX" },
        { "name": "Header", "hex": "#XXXXXX" },
        { "name": "Footer", "hex": "#XXXXXX" },
        { "name": "Sidebar", "hex": "#XXXXXX" },
        { "name": "SidebarText", "hex": "#XXXXXX" },
        { "name": "SidebarHover", "hex": "#XXXXXX" },
        { "name": "SidebarSelect", "hex": "#XXXXXX" }
      ]
    },
    // Repeat similar structure for Palettes 2 to 6
  ]
}`;

        const stream = await together.chat.completions.create({
            model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
            messages: [
                { role: 'system', content: 'You are a color palette generator that only responds with valid JSON.' },
                { role: 'user', content: prompt }
            ],
            stream: true,
            ...generationConfig,
        });

        let result = '';
        for await (const chunk of stream) {
            result += chunk.choices[0]?.delta?.content || '';
        }

        // Log the raw result for debugging
        console.log('Raw AI Response:', result);

        // Clean the result string to extract JSON
        result = result.trim();
        const jsonMatch = result.match(/{[\s\S]*}/);
        if (jsonMatch) {
            result = jsonMatch[0];
        } else {
            console.error('No JSON found in the AI response.');
            return NextResponse.json(
                {
                    message: 'Failed to parse palette data',
                    error: 'No JSON found in AI response',
                },
                { status: 500 }
            );
        }

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(result);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError, '\nRaw result:', result);
            return NextResponse.json(
                {
                    message: 'Failed to parse palette data',
                    error: parseError.message,
                },
                { status: 500 }
            );
        }

        // Validate parsedResponse structure
        if (!parsedResponse.paletteCards || !Array.isArray(parsedResponse.paletteCards)) {
            throw new Error('Invalid palette format received');
        }

        const palettes = parsedResponse.paletteCards;

        // Validate each palette
        palettes.forEach((palette, index) => {
            if (!palette.colors || !Array.isArray(palette.colors)) {
                throw new Error(`Invalid palette structure at index ${index}`);
            }
            palette.colors.forEach((color) => {
                if (!color.name || !color.hex) {
                    throw new Error(`Invalid color structure in palette at index ${index}`);
                }
            });
        });

        return NextResponse.json({ palettes });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
                error: error.message,
            },
            { status: 500 }
        );
    }
}