// app/api/chat/route.js
import Together from "together-ai";
import { NextResponse } from "next/server";
import colors from "@/lib/colors"; // Adjust the path based on your project structure
import { getRandomInt } from "@/lib/utils"; // Utility function to get a random integer

const together = new Together();

const generationConfig = {
  temperature: 0.7,
  top_p: 0.95,
  max_tokens: 8192,
};

// Utility function to select a shade based on preference
const selectShade = (colorName, preference) => {
  const colorShades = colors[colorName];
  if (!colorShades) {
    throw new Error(`Color "${colorName}" not found.`);
  }

  if (preference === "Light") {
    // Shades 50 - 400
    const lightShades = [50, 100, 200, 300, 400];
    const selectedShade = lightShades[getRandomInt(0, lightShades.length - 1)];
    return colorShades[selectedShade];
  } else if (preference === "Dark") {
    // Shades 500 - 950 for specified colors
    const darkShadesGeneral = [500, 600, 700, 800, 900, 950];
    const darkShadesSpecial = [950]; // for colors: emerald, green, lime, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

    const specialColors = [
      "Emerald",
      "Green",
      "Lime",
      "Teal",
      "Cyan",
      "Sky",
      "Blue",
      "Indigo",
      "Violet",
      "Purple",
      "Fuchsia",
      "Pink",
      "Rose",
    ];

    if (specialColors.includes(colorName)) {
      return colorShades[950];
    } else {
      const selectedShade = darkShadesGeneral[getRandomInt(0, darkShadesGeneral.length - 1)];
      return colorShades[selectedShade];
    }
  }

  throw new Error(`Invalid background color preference: ${preference}`);
};

export async function POST(request) {
  try {
    const {
      primaryColor,
      backgroundColorPreference,
      contrastPreference,
      intendedMood,
      customDescription,
    } = await request.json();

    if (
      !primaryColor ||
      !backgroundColorPreference ||
      !contrastPreference ||
      !intendedMood
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!colors[primaryColor]) {
      return NextResponse.json(
        { message: `Unsupported primary color: ${primaryColor}` },
        { status: 400 }
      );
    }

    // Select background color based on preference
    const backgroundColor = selectShade(primaryColor, backgroundColorPreference);

    // Select accent color: a slightly higher contrast based on background color
    const primaryShades = Object.keys(colors[primaryColor])
      .map(Number)
      .sort((a, b) => a - b);
    const bgShade = Object.keys(colors[primaryColor]).find(
      (shade) => colors[primaryColor][shade] === backgroundColor
    );
    const bgShadeIndex = primaryShades.indexOf(Number(bgShade));
    let accentShade =
      bgShadeIndex + 1 < primaryShades.length
        ? primaryShades[bgShadeIndex + 1]
        : bgShade;

    const accentColor = colors[primaryColor][accentShade];

    // Prepare the prompt with selected colors
    const paletteData = {
      primaryColor,
      backgroundColorPreference,
      contrastPreference,
      intendedMood,
      customDescription,
      backgroundColor,
      accentColor,
    };

    const initialPrompt = `Phase 1: Analyze the primary color and background color preference.

Primary Color: ${primaryColor}
Background Color Preference: ${backgroundColorPreference}

Determine a suitable background shade based on the primary color and preference.`;

    const finalPrompt = `Phase 2: Generate 6 distinguishable color palettes based on the analysis.

Contrast Preference: ${contrastPreference}
Intended Mood: ${intendedMood}
Custom Color or Description: ${customDescription}

Ensure the background and accent colors are derived from the primary color with appropriate contrast. Provide detailed descriptions influenced by the intended mood.

Requirements:
1. Color Roles & Usage Guidelines:
   - Primary: Main brand color, used for CTAs and key UI elements (20-30% of interface)
   - Secondary: Supporting color for secondary actions (15-20% of interface)
   - Accent: less contrasting color based on background color (5-10% of interface)
   - Background: Main content background (30-40% of interface)
   - Border: Subtle divisions and containers (5-10% of interface)
   - Hover: Interactive state variations (5-10% of interface)

2. Accessibility Requirements:
   - Maintain WCAG 2.1 AA contrast ratio (4.5:1) with background for Primary & Secondary
   - Text colors must achieve AAA compliance (7:1) for body text
   - Include color-blind friendly combinations
   - Avoid problematic color combinations (red/green, blue/purple)

3. Technical Specifications:
   - All colors in hexadecimal format
   - Proper color space considerations (sRGB)
   - Consistent saturation levels within specified intensity range
   - Sufficient contrast between interactive and non-interactive elements

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
   - Depending on the shade of the background and the accent of the card, use dark text for light accents or background colors and light text for dark backgrounds.
   - Use the secondary color for the bar colors, maintaining borders with a light color when the accent and background are dark.
   - For text color in sales.name and sales.email:
     a. White for dark accents/background, gray for email.
     b. Black for light accents/background, gray for email.
   - Hover effects should appropriately reflect the interactive states.

**Respond only with valid JSON without any additional text or markdown. The JSON structure should have a top-level key "palettes" which is an array of palette objects as described below. Ensure no duplicate keys within each palette object.**

Each palette object should have the following structure:
{
  "name": "palette-variant-X",
  "colors": {
    "primary": "#HEXCODE",
    "secondary": "#HEXCODE",
    "accent": "#HEXCODE",
    "background": "#HEXCODE",
    "border": "#HEXCODE",
    "hover": "#HEXCODE",
    "text": "#HEXCODE",
    "sales_name": "#HEXCODE",
    "sales_email": "#HEXCODE"
  },
  "description": {
    "primary_use_case": "Description here",
    "suggested_industry_application": "Description here",
    "key_psychological_effects": "Description here",
    "recommended_content_types": "Description here"
  }
}
`;

    let stream;
    try {
      // Phase 1: Analyze colors
      await together.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a color palette generator that only responds with valid JSON.",
          },
          { role: "user", content: initialPrompt },
        ],
        stream: false,
        ...generationConfig,
      });

      // Phase 2: Generate palettes
      stream = await together.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a color palette generator that only responds with valid JSON.",
          },
          { role: "user", content: finalPrompt },
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
        { status: 500 }
      );
    }

    let result = "";
    try {
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }

      result = result.trim();

      if (result.startsWith("```json")) {
        result = result.replace(/```json\s*/, "").replace(/```$/, "").trim();
      }

      result = result.replace(/`/g, "").trim();

      const jsonStart = result.indexOf("{");
      const jsonEnd = result.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        result = result.substring(jsonStart, jsonEnd + 1);
      }

      console.log("Cleaned Raw Result:", result);
    } catch (streamError) {
      console.error("Error during streaming:", streamError);
      return NextResponse.json(
        {
          message: "Failed to process streamed response",
          error: streamError.message,
        },
        { status: 500 }
      );
    }

    let palettesData;
    try {
      const parsedResponse = JSON.parse(result);
      console.log("Parsed response:", parsedResponse);

      if (!parsedResponse.palettes || !Array.isArray(parsedResponse.palettes)) {
        throw new Error("Invalid palette format received");
      }

      palettesData = parsedResponse.palettes.map((palette, index) => {
        const {
          colors: {
            primary,
            secondary,
            accent,
            background,
            border,
            hover,
            text,
            sales_name,
            sales_email,
          } = {},
          name,
          description,
          ...rest
        } = palette;

        const requiredColors = [
          "primary",
          "secondary",
          "accent",
          "background",
          "border",
          "hover",
          "text",
          "sales_name",
          "sales_email",
        ];

        for (const color of requiredColors) {
          if (!palette.colors || !palette.colors[color]) {
            throw new Error(
              `Missing color '${color}' in palette at index ${index}`
            );
          }
        }

        return {
          ...rest,
          name,
          colors: {
            primary,
            secondary,
            accent,
            background,
            border,
            hover,
            text,
            sales_name,
            sales_email,
          },
          description,
        };
      });

      return NextResponse.json({ palettes: palettesData });
    } catch (parseError) {
      console.error(
        "Error parsing JSON:",
        parseError,
        "\nCleaned Raw Result:",
        result
      );
      return NextResponse.json(
        {
          message: "Failed to parse palette data",
          error: parseError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}