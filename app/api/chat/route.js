// route.js

import Together from "together-ai"; // Importing the Together AI SDK
import { NextResponse } from "next/server"; // Importing Next.js response utility

const together = new Together(); // Initialize the Together AI client

// Configuration for the AI generation
const generationConfig = {
  temperature: 0.7, // Controls the randomness of the AI output
  top_p: 0.95,       // Controls the diversity via nucleus sampling
  max_tokens: 8192,  // Maximum number of tokens in the response
};

/**
 * POST handler for generating color palettes.
 * Expects a JSON payload with specific color and design preferences.
 */
export async function POST(req) {
  try {
    // Destructure required fields from the request body
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

    // Validate that all required fields are present
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
        { status: 400 }
      );
    }

    // Construct the prompt for the AI model
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

**Please respond only with valid JSON without any additional text or markdown. The JSON structure should have a top-level key "palettes" which is an array of palette objects as described below. Ensure that there are no duplicate keys within each palette object.**

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
      // Initiate the AI generation process with the specified model and prompt
      stream = await together.chat.completions.create({
        model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo", // Specify the AI model
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
        { status: 500 }
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
        result = result.replace(/```json\s*/, "").replace(/```$/, "").trim();
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
        { status: 500 }
      );
    }

    let palettes;
    try {
      // Parse the cleaned JSON string
      const parsedResponse = JSON.parse(result);
      console.log("Parsed response:", parsedResponse);

      // Validate that the "palettes" key exists and is an array
      if (!parsedResponse.palettes || !Array.isArray(parsedResponse.palettes)) {
        throw new Error("Invalid palette format received");
      }

      // Transform each palette to ensure it has the correct structure
      palettes = parsedResponse.palettes.map((palette, index) => {
        // Destructure the required color properties from the "colors" object
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
          } = {}, // Provide a default empty object to prevent destructuring errors
          name,
          description,
          ...rest // Capture any additional properties
        } = palette;

        // Define the required color properties
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

        // Validate that all required color properties are present
        for (const color of requiredColors) {
          if (!palette.colors || !palette.colors[color]) {
            throw new Error(
              `Missing color '${color}' in palette at index ${index}`
            );
          }
        }

        // Return the transformed palette object
        return {
          ...rest, // Spread any additional properties
          name,    // Include the palette name
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
          }, // Ensure colors are nested under the "colors" key
          description, // Include the palette description
        };
      });

      // Send the successfully parsed and transformed palettes as a JSON response
      return NextResponse.json({ palettes });
    } catch (parseError) {
      // Handle JSON parsing errors or validation failures
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
    // Handle any unexpected errors
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