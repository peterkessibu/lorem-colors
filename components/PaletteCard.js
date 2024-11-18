// components/PaletteCard.js

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorSwatch from "./ColorSwatch";

/**
 * PaletteCard Component
 * 
 * Renders a card displaying a color palette with options to select the color format.
 * Each color in the palette is displayed using the ColorSwatch component.
 * Users can lock specific colors to prevent accidental changes.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.palette - The palette object containing name, colors, and description.
 * @param {string} props.colorFormat - The current color format selected (e.g., 'hex', 'rgb', 'css').
 * @param {Function} props.setColorFormat - Function to update the selected color format.
 * @returns {JSX.Element} - Rendered PaletteCard component.
 */
const PaletteCard = ({ palette, colorFormat, setColorFormat }) => {
  // State to manage which colors are locked
  const [lockedColors, setLockedColors] = useState({});

  /**
   * Toggles the lock state of a specific color.
   * Prevents accidental modifications to locked colors.
   * 
   * @param {string} colorName - The name of the color to toggle lock state.
   */
  const handleLockToggle = (colorName) => {
    setLockedColors((prev) => ({
      ...prev,
      [colorName]: !prev[colorName],
    }));
  };

  return (
    <Card className="w-full shadow-lg rounded-lg overflow-hidden mt-4">
      {/* Card Header with Gradient Background */}
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <CardTitle className="flex justify-between items-center">
          {/* Palette Name */}
          <span className="text-lg font-semibold">{palette.name}</span>
          
          {/* Color Format Selector */}
          <Select value={colorFormat} onValueChange={setColorFormat}>
            <SelectTrigger className="w-[120px] bg-white text-black rounded-md shadow-md">
              <SelectValue placeholder="Color format" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black rounded-md shadow-md">
              <SelectItem value="hex">HEX</SelectItem>
              <SelectItem value="rgb">RGB</SelectItem>
              <SelectItem value="css">CSS Variables</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-6 bg-gray-50">
        <div className="space-y-4 mt-4">
          {/* Grid Layout for Color Swatches */}
          <div className="grid grid-cols-6 gap-1">
            {Object.entries(palette.colors).map(([name, hex]) => (
              <ColorSwatch
                key={name}               // Unique key for each swatch
                color={hex}              // Hex code of the color
                name={name}              // Name of the color (e.g., 'primary')
                locked={lockedColors[name]} // Lock state of the color
                onLockToggle={handleLockToggle} // Function to toggle lock state
                format={colorFormat}     // Current color format selected
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaletteCard;