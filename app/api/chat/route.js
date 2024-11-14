import Together from "together-ai";
import { NextResponse } from "next/server";

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
      return NextResponse.json(
        { message: "All fields (theme, intensity, mood) are required" },
        { status: 400 },
      );
    }

    // Modified prompt to ensure consistent JSON output
    const prompt = `Generate 6 color palettes for a ${theme} website with ${intensity} intensity and ${mood} mood.

Parameters Definition:
- theme: [modern-corporate | tech-startup | creative-agency | e-commerce | healthcare | education]
- intensity: [subtle (30-50% saturation) | moderate (50-70% saturation) | bold (70-90% saturation)]
- mood: [professional | playful | calming | energetic | luxurious | trustworthy]

Requirements:
1. Color Roles & Usage Guidelines:
   - Primary: Main brand color, used for CTAs and key UI elements (20-30% of interface)
   - Secondary: Supporting color for secondary actions (15-20% of interface)
   - Accent: Off white variation of the primary color, used for minimalistic tone (5-10% of interface)
   - Background: Main content background (30-40% of interface)
   - Border: Subtle divisions and containers (5-10% of interface)
   - Hover: Interactive state variations (5-10% of interface)

2. Accessibility Requirements:
   - Primary & Secondary: Must maintain WCAG 2.1 AA contrast ratio (4.5:1) with background
   - Text colors must achieve AAA compliance (7:1) for body text
   - Include color-blind friendly combinations
   - Avoid problematic color combinations (red/green, blue/purple)

3. Technical Specifications:
   - All colors must be provided in hexadecimal format
   - Include proper color space considerations (sRGB)
   - Maintain consistent saturation levels within the specified intensity range
   - Ensure sufficient contrast between interactive and non-interactive elements

4. Palette Naming Convention:
   Each palette should follow the format: "${theme}-${intensity}-${mood}-variant-X"
   Example: "tech-startup-bold-energetic-variant-1"

5. Description Requirements:
   Each palette description should include:
   - Primary use case
   - Suggested industry application
   - Key psychological effects
   - Recommended content types

Return valid JSON in this format:
{
  "paletteCards": [
    {
      "name": "Palette Name",
      "description": "Detailed description following requirements",
      "colors": [
        {
          "name": "Primary",
          "hex": "#XXXXXX",
          "usage": "Specific usage guidelines",
          "contrastRatio": {
            "withBackground": "X.XX:1",
            "withWhite": "X.XX:1",
            "withBlack": "X.XX:1"
          }
        },
        // Repeat for all 6 colors
      ],
      "accessibilityNotes": "Specific accessibility considerations",
      "technicalNotes": "Additional technical guidance"
    }
  ],
  "metadata": {
    "theme": "${theme}",
    "intensity": "${intensity}",
    "mood": "${mood}",
    "generatedAt": "ISO timestamp",
    "version": "1.0"
  }
}

Example Usage:
prompt: Generate 6 color palettes for a "tech-startup" website with "bold" intensity and "energetic" mood.
`;

    let stream;
    try {
      stream = await together.chat.completions.create({
        model: "Qwen/Qwen2.5-72B-Instruct-Turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a color palette generator that only responds with valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        stream: true,
        ...generationConfig,
      });
    } catch (apiError) {
      console.error("Error calling Together API:", apiError);
      return NextResponse.json(
        {
          message: "Failed to generate palettes",
          error: apiError.message,
        },
        { status: 500 },
      );
    }

    let result = "";
    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || "";
    }

    // Clean the result string to ensure it only contains the JSON portion
    result = result.trim();
    if (result.startsWith("```json")) {
      result = result.replace(/```json\n?/, "").replace(/```$/, "");
    }

    console.log("Raw result:", result); // Log the raw result string

    let palettes;
    try {
      const parsedResponse = JSON.parse(result);
      if (
        !parsedResponse.paletteCards ||
        !Array.isArray(parsedResponse.paletteCards)
      ) {
        throw new Error("Invalid palette format received");
      }
      palettes = parsedResponse.paletteCards;
      // Validate each palette's structure
      palettes.forEach((palette, index) => {
        if (
          !palette.colors ||
          !Array.isArray(palette.colors) ||
          palette.colors.length !== 6
        ) {
          throw new Error(`Invalid palette structure at index ${index}`);
        }
      });
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError, "\nRaw result:", result);
      return NextResponse.json(
        {
          message: "Failed to parse palette data",
          error: parseError.message,
        },
        { status: 500 },
      );
    }
    return NextResponse.json({ palettes });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
