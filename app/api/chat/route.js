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

6. Additional Requirements:
   - Use the accent colors for the cards.
   - Depending on the shade of the background and the accent of the card, use dark text for a light accent or background color and light text for a dark background.
   - Use the secondary color for the bar colors, maintaining borders but using a light color for the border when the accent is dark as well as the background.
   - For the text color in the sales.name and sales.email:
     a. The name should be white for dark accents and background, and the email should be slightly off the color of the name (e.g., text-white for the name and gray for the email).
     b. The name should be black or shades of black for light accents and background, and the email should be slightly off the color of the name (e.g., text-black for the name and gray for the email).
   - For the hover effect, the hover colors should be for hover, when hover before the hover colors shows.

**Please respond only with valid JSON without any additional text or markdown. The JSON structure should have a top-level key "palettes" which is an array of palette objects as described above. Ensure that there are no duplicate keys within each palette object.**
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

    // Log the raw result once
    console.log("Raw result:", result);

    let palettes;
    try {
      const parsedResponse = JSON.parse(result);
      console.log("Parsed response:", parsedResponse);
      if (
        !parsedResponse.palettes ||
        !Array.isArray(parsedResponse.palettes)
      ) {
        throw new Error("Invalid palette format received");
      }
      palettes = parsedResponse.palettes;
      palettes.forEach((palette, index) => {
        if (
          !palette.colors ||
          typeof palette.colors !== 'object' ||
          Object.keys(palette.colors).length === 0
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