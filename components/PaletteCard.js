"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paintbrush, Download } from "lucide-react";
import ColorSwatch from "./ColorSwatch";
import MockupWindow from "./MockupWindow";

const PaletteCard = ({ palette, index }) => {
  const [currentPalette, setCurrentPalette] = useState(palette);
  const [lockedColors, setLockedColors] = useState({});
  const [colorFormat, setColorFormat] = useState("hex");

  const handleLockToggle = (colorName) => {
    setLockedColors((prev) => ({ ...prev, [colorName]: !prev[colorName] }));
  };

  const handleColorChange = (colorName) => {
    if (!lockedColors[colorName]) {
      setCurrentPalette((prev) => ({
        ...prev,
        [colorName]: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      }));
    }
  };

  const downloadPalette = () => {
    let content = "";
    switch (colorFormat) {
      case "hex":
        content = Object.entries(currentPalette)
          .map(([name, color]) => `${name}: ${color}`)
          .join("\n");
        break;
      case "rgb":
        content = Object.entries(currentPalette)
          .map(([name, color]) => {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `${name}: rgb(${r}, ${g}, ${b})`;
          })
          .join("\n");
        break;
      case "css":
        content = `:root {\n${Object.entries(currentPalette)
          .map(([name, color]) => `  --color-${name}: ${color};`)
          .join("\n")}\n}`;
        break;
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-${index + 1}.${colorFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Palette {index + 1}</span>
          <Select value={colorFormat} onValueChange={setColorFormat}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Color format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hex">HEX</SelectItem>
              <SelectItem value="rgb">RGB</SelectItem>
              <SelectItem value="css">CSS Variables</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MockupWindow colors={currentPalette} />
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {currentPalette.colors.map((color) => (
              <ColorSwatch
                key={color.name}
                color={color.hex}
                name={color.name}
                locked={lockedColors[color.name]}
                onLockToggle={handleLockToggle}
                onColorChange={handleColorChange}
                format={colorFormat}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleColorChange("all")}>
          <Paintbrush className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
        <Button onClick={downloadPalette}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaletteCard;