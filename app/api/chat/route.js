import Together from "together-ai";
import { NextResponse } from "next/server";

const together = new Together();

const generationConfig = {
  temperature: 0.7,
  top_p: 0.95,
  max_tokens: 8192,
};

export async function POST(req) {
  try {
    const {
      primaryColor,
      accentColor,
      backgroundColor,
      saturationLevel,
      contrastPreference,
      intendedMood,
      shadePreference,
      customDescription,
    } = await req.json();

    if (
      !primaryColor ||
      !accentColor ||
      !backgroundColor ||
      !saturationLevel ||
      !contrastPreference ||
      !intendedMood ||
      !shadePreference
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const prompt = `Generate 6 color palettes based on the following criteria:

Primary Color: ${primaryColor}
Accent Color: ${accentColor}
Background Color Preference: ${backgroundColor}
Saturation Level: ${saturationLevel}
Contrast Preference: ${contrastPreference}
Intended Mood: ${intendedMood}
Shade Preference (for shadows and accents): ${shadePreference}
Custom Color or Description: ${customDescription}

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
   Each palette should follow the format: "palette-variant-X"
   Example: "palette-variant-1"

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
    "generatedAt": "ISO timestamp",
    "version": "1.0"
  }
}

Example Usage:
prompt: Generate 6 color palettes based on the following criteria: Primary Color: Blue, Accent Color: Teal, Background Color Preference: Light, Saturation Level: Highly Saturated, Contrast Preference: High Contrast, Intended Mood: Professional, Shade Preference (for shadows and accents): Light Shades, Custom Color or Description: 'cool oceanic tones'.
`;

    let stream;
    try {
      stream = await together.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
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

    result = result.trim();
    if (result.startsWith("```json")) {
      result = result.replace(/```json\n?/, "").replace(/```$/, "");
    }

    console.log("Raw result:", result);

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
