// app/api/chat/route.js

import Together from "together-ai";
import { NextResponse } from "next/server";
import colors from "@/lib/colors";
import { getRandomInt } from "@/lib/utils";

const together = new Together();

const generationConfig = {
  temperature: 0.7,
  top_p: 0.95,
  max_tokens: 8192,
};

// Definitions of intended moods
const moodDefinitions = {
  Professional:
    "A polished, refined approach that emphasizes competence, precision, and corporate standards",
  Playful:
    "A lighthearted, creative style that embraces whimsy, spontaneity, and joyful expression",
  Minimalistic:
    "A clean, streamlined design focused on essential elements, simplicity, and elegant restraint",
  Bold: "A dramatic, high-impact style characterized by strong statements, confident choices, and striking contrasts",
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
      const selectedShade =
        darkShadesGeneral[getRandomInt(0, darkShadesGeneral.length - 1)];
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
        { status: 400 },
      );
    }

    if (!colors[primaryColor]) {
      return NextResponse.json(
        { message: `Unsupported primary color: ${primaryColor}` },
        { status: 400 },
      );
    }

    // Select background color based on preference
    const backgroundColor = selectShade(
      primaryColor,
      backgroundColorPreference,
    );

    // Select accent color: a shade slightly different from background color
    const primaryShades = Object.keys(colors[primaryColor])
      .map(Number)
      .sort((a, b) => a - b);
    const bgShade = Object.keys(colors[primaryColor]).find(
      (shade) => colors[primaryColor][shade] === backgroundColor,
    );
    const bgShadeIndex = primaryShades.indexOf(Number(bgShade));
    let accentShade =
      bgShadeIndex + 1 < primaryShades.length
        ? primaryShades[bgShadeIndex + 1]
        : bgShade;

    const accentColor = colors[primaryColor][accentShade];

    // Get mood description
    const moodDescription = moodDefinitions[intendedMood] || "";

    // Prepare the prompt with selected colors and mood definitions
    const prompt = `
    Generate 6 color palettes with distinctly visible and contrasting variants based on the following criteria:

Primary Color: ${primaryColor} (This should be the base color for the background and accent, with all other colors relating to it, especially for the light and dark Background Color Preference)
Accent Color: ${accentColor}
Background Color Preference: ${backgroundColorPreference}
Saturation Level: ${contrastPreference}
Contrast Preference: ${contrastPreference}
Intended Mood: ${intendedMood} - ${moodDescription}
Shade Preference (for shadows and accents): ${backgroundColorPreference === 'light' ? 'soft and light shades only.' : 'dark and rich shades only.'}
Custom Color or Description: ${customDescription}

Requirements:
1. Color Roles & Usage Guidelines:
   - Primary: Main brand color, used for CTAs and key UI elements (20-30% of interface). Must be distinctly different from secondary and accent colors.
   - Secondary: Supporting color for secondary actions (15-20% of interface). Should complement but contrast the primary color.
   - Accent: Off white or contrasting variation of the primary color, used for minimalistic tone (5-10% of interface). Must stand out against both primary and background colors.
   - Background: Main content background (30-40% of interface). 
     - For light mode: Use a light shade that complements the primary color.
     - For dark mode: Use a darker version of the primary color instead of generic dark colors like black, ensuring it harmonizes with the primary color.
     - Ensure high contrast with primary and accent colors.
   - Border: Subtle divisions and containers (5-10% of interface). Should be visible against the background without overpowering other elements.
   - Hover: Interactive state variations (5-10% of interface). Must provide clear visual feedback, differing significantly from default states.

2. Accessibility Requirements:
   - Primary & Secondary: Must maintain WCAG 2.1 AA contrast ratio (4.5:1) with background.
   - Text Colors: Must achieve AAA compliance (7:1) for body text.
   - Color-Blind Friendly: Include color combinations that are distinguishable for color-blind users.
   - Avoid Problematic Combinations: Such as red/green and blue/purple to prevent confusion.
   - Distinctiveness: Each color in a palette should be easily distinguishable from the others to ensure clarity and usability.

3. Technical Specifications:
   - Hexadecimal Format: All colors must be provided in hexadecimal format.
   - Color Space: Include proper color space considerations (sRGB).
   - Saturation Levels: Maintain consistent saturation levels within the specified intensity range to ensure visual harmony.
   - Contrast: Ensure sufficient contrast between interactive and non-interactive elements.
   - Hue Variation: Incorporate a balanced range of hues to enhance visibility and aesthetic appeal.

4. Palette Naming Convention:
   - Each palette should follow the format: "Palette-variant-X"
   - Example: "Palette-Variant-1"

5. Description Requirements:
   - Each palette description should include:
     - Primary Use Case: Specific scenarios where the palette excels.
     - Suggested Industry Application: Industries that would benefit most from the palette.
     - Key Psychological Effects: Emotional and psychological impact of the color combinations.
     - Recommended Content Types: Types of content that align well with the palette.

6. Additional Requirements:
   - Accent Colors for Cards: Use accent colors to style card components distinctly.
   - Text Color Based on Theme:
     - Use white text for dark accents/backgrounds.
     - Use black text for light accents/backgrounds.
   - Hover Styles with Pure CSS Classes:
     - Assign a unique CSS class for hover effects.
     - Define hover-generated background and text colors within these classes to ensure consistency and maintainability.
   - Secondary Color for Bar Colors:
     - Use the secondary color for bar elements in charts.
     - Maintain light-colored borders when the accent and background are dark to ensure visibility.
   - Sales Text Colors:
     - Name: Use white text for dark accents/backgrounds and black text for light accents/backgrounds.
     - Email: Use gray text consistently regardless of theme.
   - Hover Effects:
     - Ensure hover states reflect interactive states appropriately, providing clear visual feedback without compromising color visibility.

Respond only with valid JSON without any additional text or markdown. The JSON structure should have a top-level key "palettes" which is an array of palette objects as described below. Ensure no duplicate keys within each palette object.

Each palette object should have the following structure:
    {
      "name": "Palette-Variant-X",
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
      // Initiate the AI generation process with the specified model and prompt
      stream = await together.chat.completions.create({
        model: `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, // Specify the AI model
        messages: [
          {
            role: "system",
            content:
              "You are a color palette generator that only responds with valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        stream: true, // Enable streaming of the response
        ...generationConfig, // Spread the generation configuration
      });
    } catch (apiError) {
      // Handle errors from the AI API
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
    try {
      // Aggregate the streamed response chunks
      for await (const chunk of stream) {
        result += chunk.choices[0]?.delta?.content || "";
      }

      result = result.trim(); // Trim any leading/trailing whitespace

      // Remove any markdown code block wrappers (e.g., ```json ... ```)
      if (result.startsWith("```json")) {
        result = result
          .replace(/```json\s*/, "")
          .replace(/```$/, "")
          .trim();
      }

      // Remove any remaining backticks
      result = result.replace(/`/g, "").trim();

      // Extract JSON content if there's any additional text present
      const jsonStart = result.indexOf("{");
      const jsonEnd = result.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        result = result.substring(jsonStart, jsonEnd + 1);
      }

      // Log the cleaned result for debugging purposes
      console.log("Cleaned Raw Result:", result);
    } catch (streamError) {
      // Handle any errors that occur during the streaming process
      console.error("Error during streaming:", streamError);
      return NextResponse.json(
        {
          message: "Failed to process streamed response",
          error: streamError.message,
        },
        { status: 500 },
      );
    }

    let palettesData;
    try {
      // Parse the cleaned JSON string
      const parsedResponse = JSON.parse(result);
      console.log("Parsed response:", parsedResponse);

      // Validate that the "palettes" key exists and is an array
      if (!parsedResponse.palettes || !Array.isArray(parsedResponse.palettes)) {
        throw new Error("Invalid palette format received");
      }

      // Transform each palette to ensure it has the correct structure
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
              `Missing color '${color}' in palette at index ${index}`,
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

      // Send the successfully parsed and transformed palettes as a JSON response
      return NextResponse.json({ palettes: palettesData });
    } catch (parseError) {
      // Handle JSON parsing errors or validation failures
      console.error(
        "Error parsing JSON:",
        parseError,
        "\nCleaned Raw Result:",
        result,
      );
      return NextResponse.json(
        {
          message: "Failed to parse palette data",
          error: parseError.message,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    // Handle any unexpected errors
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
