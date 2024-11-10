// components/PaletteCard.js

"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paintbrush, Download } from "lucide-react";
import ColorSwatch from "./ColorSwatch";

const PaletteCard = ({ palette, onPaletteChange, colorFormat, setColorFormat }) => {
    const [lockedColors, setLockedColors] = useState({});

    const handleLockToggle = (colorName) => {
        setLockedColors((prev) => ({ ...prev, [colorName]: !prev[colorName] }));
    };

    const handleColorChange = (colorName) => {
        if (colorName === "all") {
            const updatedColors = palette.colors.map((color) =>
                lockedColors[color.name] ? color : { ...color, hex: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}` }
            );
            onPaletteChange({ ...palette, colors: updatedColors });
        } else {
            if (!lockedColors[colorName]) {
                const newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
                const updatedColors = palette.colors.map((color) =>
                    color.name === colorName ? { ...color, hex: newColor } : color
                );
                onPaletteChange({ ...palette, colors: updatedColors });
            }
        }
    };

    const downloadPalette = () => {
        let content = "";
        switch (colorFormat) {
            case "hex":
                content = palette.colors.map((color) => `${color.name}: ${color.hex}`).join("\n");
                break;
            case "rgb":
                content = palette.colors
                    .map((color) => {
                        const r = parseInt(color.hex.slice(1, 3), 16);
                        const g = parseInt(color.hex.slice(3, 5), 16);
                        const b = parseInt(color.hex.slice(5, 7), 16);
                        return `${color.name}: rgb(${r}, ${g}, ${b})`;
                    })
                    .join("\n");
                break;
            case "css":
                content = `:root {\n${palette.colors
                    .map((color) => `  --color-${color.name.toLowerCase()}: ${color.hex};`)
                    .join("\n")}\n}`;
                break;
        }
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `palette.${colorFormat}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{palette.name}</span>
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
                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        {palette.colors.map((color) => (
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