// components/PaletteCard.js

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorSwatch from "./ColorSwatch";

const PaletteCard = ({ palette, colorFormat, setColorFormat }) => {
  const [lockedColors, setLockedColors] = useState({});

  const handleLockToggle = (colorName) => {
    setLockedColors((prev) => ({ ...prev, [colorName]: !prev[colorName] }));
  };

  return (
    <Card className="w-full shadow-lg rounded-lg overflow-hidden mt-4">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">{palette.name}</span>
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
      <CardContent className="p-6 bg-gray-50">
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-6 gap-1">
            {palette.colors.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color.hex}
                name={color.name}
                locked={lockedColors[color.name]}
                onLockToggle={handleLockToggle}
                format={colorFormat}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaletteCard;
