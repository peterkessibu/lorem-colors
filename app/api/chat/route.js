import Together from 'together-ai';
import { NextResponse } from 'next/server';

const together = new Together();

const generationConfig = {
    temperature: 0.7, // Lowered temperature for more consistent output
    top_p: 0.95,
    max_tokens: 8192,
};

export async function POST(req) {
    try {
        const { theme, intensity, mood } = await req.json();

        if (!theme || !intensity || !mood) {
            return NextResponse.json({ message: 'All fields (theme, intensity, mood) are required' }, { status: 400 });
        }

        // Modified prompt to ensure consistent JSON output
        const prompt = `Generate 6 color palettes for a ${theme} website with ${intensity} intensity and ${mood} mood. Return only valid JSON in this exact format:
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
                { "name": "Additional1", "hex": "#XXXXXX" },
                { "name": "Additional2", "hex": "#XXXXXX" }
              ]
            }
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

        // Clean the result string to ensure it only contains the JSON portion
        result = result.trim();
        if (result.startsWith('```json')) {
            result = result.replace(/```json\n?/, '').replace(/```$/, '');
        }

        let palettes;
        try {
            const parsedResponse = JSON.parse(result);

            if (!parsedResponse.paletteCards || !Array.isArray(parsedResponse.paletteCards)) {
                throw new Error('Invalid palette format received');
            }

            palettes = parsedResponse.paletteCards;

            // Validate each palette's structure
            palettes.forEach((palette, index) => {
                if (!palette.colors || !Array.isArray(palette.colors) || palette.colors.length !== 9) {
                    throw new Error(`Invalid palette structure at index ${index}`);
                }
            });

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError, '\nRaw result:', result);
            return NextResponse.json({
                message: 'Failed to parse palette data',
                error: parseError.message
            }, { status: 500 });
        }

        return NextResponse.json({ palettes });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            message: 'Internal server error',
            error: error.message
        }, { status: 500 });
    }
}
