"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paintbrush, Download, Lock, Unlock, Copy, Check } from "lucide-react";

// Simulated AI model for generating color palettes
const generatePalettes = (answers) => {
  // This is a placeholder function. In a real application, this would be replaced with an actual AI model or API call.
  const palettes = [];
  for (let i = 0; i < 6; i++) {
    palettes.push({
      primary: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      secondary: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      accent: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      background: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      surface: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      border: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      hover: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      text: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      textLight: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    });
  }
  return palettes;
};

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
            {Object.entries(currentPalette).map(([name, color]) => (
              <ColorSwatch
                key={name}
                color={color}
                name={name}
                locked={lockedColors[name]}
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

const MultiSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-lg font-semibold">{label}</Label>
      <Select value={value} onValueChange={(selectedValues) => onChange(selectedValues)} multiple>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select options" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const QuestionnaireForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    emotions: [],
    audience: [],
    personality: [],
    colorPreferences: [],
    designPurpose: "",
    uiPriority: [],
    contrastPreference: "",
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
      <MultiSelect
        label="Which emotions should the colors convey?"
        options={["Calm", "Energetic", "Sophisticated", "Fun", "Warm", "Modern"]}
        value={answers.emotions}
        onChange={(value) => handleChange("emotions", value)}
      />

      <MultiSelect
        label="Who is the primary audience for this design?"
        options={["Young Adults", "Professionals", "Families", "Tech Enthusiasts", "General Audience"]}
        value={answers.audience}
        onChange={(value) => handleChange("audience", value)}
      />

      <MultiSelect
        label="How would you describe the brand's personality?"
        options={["Bold", "Friendly", "Elegant", "Trustworthy", "Minimalistic"]}
        value={answers.personality}
        onChange={(value) => handleChange("personality", value)}
      />

      <MultiSelect
        label="Do you have any color preferences or avoidances?"
        options={["No Red", "Prefer Blues", "Prefer Greens", "No Yellow", "Earth Tones"]}
        value={answers.colorPreferences}
        onChange={(value) => handleChange("colorPreferences", value)}
      />

      <div>
        <Label className="text-lg font-semibold">What is the primary purpose of this design?</Label>
        <RadioGroup
          value={answers.designPurpose}
          onValueChange={(value) => handleChange("designPurpose", value)}
          className="grid grid-cols-2 gap-2 mt-2"
        >
          {["E-commerce", "Portfolio", "Blog", "SaaS App", "Marketing Campaign"].map((purpose) => (
            <div key={purpose} className="flex items-center space-x-2">
              <RadioGroupItem value={purpose} id={`purpose-${purpose}`} />
              <Label htmlFor={`purpose-${purpose}`}>{purpose}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <MultiSelect
        label="Which UI elements should stand out most?"
        options={["Buttons", "Background", "Headers", "Text", "Icons"]}
        value={answers.uiPriority}
        onChange={(value) => handleChange("uiPriority", value)}
      />

      <div>
        <Label className="text-lg font-semibold">How much contrast would you like in the color scheme?</Label>
        <RadioGroup
          value={answers.contrastPreference}
          onValueChange={(value) => handleChange("contrastPreference", value)}
          className="grid grid-cols-2 gap-2 mt-2"
        >
          {["High Contrast", "Medium", "Low", "Pastel"].map((contrast) => (
            <div key={contrast} className="flex items-center space-x-2">
              <RadioGroupItem value={contrast} id={`contrast-${contrast}`} />
              <Label htmlFor={`contrast-${contrast}`}>{contrast}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Generate Palettes
      </Button>
    </form>
  );
};

export default function ColorPaletteGenerator() {
  const [palettes, setPalettes] = useState([]);

  const handleSubmit = (answers) => {
    const generatedPalettes = generatePalettes(answers);
    setPalettes(generatedPalettes);
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