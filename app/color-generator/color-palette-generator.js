"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paintbrush, Download, Lock, Unlock, Copy, Check } from "lucide-react";

const ColorSwatch = ({ color, name, locked, onLockToggle, onColorChange, format }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let colorValue = color;
    if (format === "rgb") {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      colorValue = `rgb(${r}, ${g}, ${b})`;
    } else if (format === "css") {
      colorValue = `var(--color-${name})`;
    }
    navigator.clipboard.writeText(colorValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
        style={{ backgroundColor: color }}
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <Copy className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
        )}
      </div>
      <span className="text-sm font-medium">{name}</span>
      <button onClick={() => onLockToggle(name)} className="text-gray-500 hover:text-gray-700">
        {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
      </button>
    </div>
  );
};

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
        <div className="space-y-4">
          <div
            className="w-full h-32 rounded-lg p-4 flex flex-col justify-between"
            style={{ backgroundColor: currentPalette.background }}
          >
            <h2 className="text-2xl font-bold" style={{ color: currentPalette.text }}>
              Sample Header
            </h2>
            <div className="flex space-x-2">
              <Button style={{ backgroundColor: currentPalette.primary, color: currentPalette.textLight }}>
                Primary
              </Button>
              <Button
                variant="outline"
                style={{
                  backgroundColor: currentPalette.secondary,
                  color: currentPalette.text,
                  borderColor: currentPalette.border,
                }}
              >
                Secondary
              </Button>
              <Button
                variant="outline"
                style={{
                  backgroundColor: currentPalette.accent,
                  color: currentPalette.textLight,
                  borderColor: currentPalette.border,
                }}
              >
                Accent
              </Button>
            </div>
          </div>
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

const QuestionnaireForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    theme: "",
    intensity: "",
    mood: "",
  });

  const handleChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-lg font-semibold">What is the theme of your project?</Label>
        <Select value={answers.theme} onValueChange={(value) => handleChange("theme", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="E-commerce">E-commerce</SelectItem>
            <SelectItem value="Portfolio">Portfolio</SelectItem>
            <SelectItem value="Blog">Blog</SelectItem>
            <SelectItem value="SaaS">SaaS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold">What is the intensity of the colors?</Label>
        <Select value={answers.intensity} onValueChange={(value) => handleChange("intensity", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select intensity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-semibold">What is the mood of the design?</Label>
        <Select value={answers.mood} onValueChange={(value) => handleChange("mood", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Calm">Calm</SelectItem>
            <SelectItem value="Energetic">Energetic</SelectItem>
            <SelectItem value="Sophisticated">Sophisticated</SelectItem>
            <SelectItem value="Fun">Fun</SelectItem>
            <SelectItem value="Warm">Warm</SelectItem>
            <SelectItem value="Modern">Modern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Generate Palettes
      </Button>
    </form>
  );
};

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);

  const handleSubmit = async (answers) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate palettes');
      }

      if (!data.palettes || !Array.isArray(data.palettes)) {
        throw new Error('Invalid palette data received');
      }

      setPalettes(data.palettes);

    } catch (error) {
      console.error('Error generating palettes:', error);
      // Add error state handling
      setPalettes([]);
      // You might want to add a state for error messages
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI-Driven Color Palette Generator</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8">
            <QuestionnaireForm onSubmit={handleSubmit} />
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          {palettes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {palettes.map((palette, index) => (
                <PaletteCard key={index} palette={palette} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">Generate palettes to see them here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}