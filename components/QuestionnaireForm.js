"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const QuestionnaireForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    primaryColor: "",
    accentColor: "",
    backgroundColor: "",
    saturationLevel: "",
    contrastPreference: "",
    intendedMood: "",
    shadePreference: "",
    customDescription: "",
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
      <div className="space-y-1">
        <Label className="text-lg font-semibold">
          Custom Color or Description
        </Label>
        <input
          value={answers.customDescription}
          className="w-full p-4 border border-gray-300 rounded-md"
          onChange={(e) => handleChange("customDescription", e.target.value)}
          placeholder="Describe any specific color or effect you envision (e.g., 'warm sunset hues,' 'cool oceanic tones,' or provide hex codes)."
        />
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">Primary Color</Label>
        <Select
          value={answers.primaryColor}
          onValueChange={(value) => handleChange("primaryColor", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select primary color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blue">Blue</SelectItem>
            <SelectItem value="Green">Green</SelectItem>
            <SelectItem value="Red">Red</SelectItem>
            <SelectItem value="Purple">Purple</SelectItem>
            <SelectItem value="Yellow">Yellow</SelectItem>
            <SelectItem value="Orange">Orange</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">Accent Color</Label>
        <Select
          value={answers.accentColor}
          onValueChange={(value) => handleChange("accentColor", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select accent color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Teal">Teal</SelectItem>
            <SelectItem value="Coral">Coral</SelectItem>
            <SelectItem value="Lavender">Lavender</SelectItem>
            <SelectItem value="Lime">Lime</SelectItem>
            <SelectItem value="Peach">Peach</SelectItem>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">
          Background Color Preference
        </Label>
        <Select
          value={answers.backgroundColor}
          onValueChange={(value) => handleChange("backgroundColor", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select background color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
            <SelectItem value="Pastel">Pastel</SelectItem>
            <SelectItem value="Gradient">Gradient</SelectItem>
            <SelectItem value="Monochromatic">Monochromatic</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">Saturation Level</Label>
        <Select
          value={answers.saturationLevel}
          onValueChange={(value) => handleChange("saturationLevel", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select saturation level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Highly Saturated">Highly Saturated</SelectItem>
            <SelectItem value="Moderately Saturated">
              Moderately Saturated
            </SelectItem>
            <SelectItem value="Subtle/Muted">Subtle/Muted</SelectItem>
            <SelectItem value="Pastel">Pastel</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">Contrast Preference</Label>
        <Select
          value={answers.contrastPreference}
          onValueChange={(value) => handleChange("contrastPreference", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select contrast preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High Contrast">High Contrast</SelectItem>
            <SelectItem value="Medium Contrast">Medium Contrast</SelectItem>
            <SelectItem value="Low Contrast">Low Contrast</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">Intended Mood</Label>
        <Select
          value={answers.intendedMood}
          onValueChange={(value) => handleChange("intendedMood", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select intended mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Playful">Playful</SelectItem>
            <SelectItem value="Minimalistic">Minimalistic</SelectItem>
            <SelectItem value="Bold">Bold</SelectItem>
            <SelectItem value="Relaxed">Relaxed</SelectItem>
            <SelectItem value="Vibrant">Vibrant</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-lg font-semibold">
          Shade Preference (for shadows and accents)
        </Label>
        <Select
          value={answers.shadePreference}
          onValueChange={(value) => handleChange("shadePreference", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select shade preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Light Shades">Light Shades</SelectItem>
            <SelectItem value="Dark Shades">Dark Shades</SelectItem>
            <SelectItem value="Mid Tones">Mid Tones</SelectItem>
            <SelectItem value="Mixed Shades">Mixed Shades</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Generate Palettes
      </Button>
    </form>
  );
};

export default QuestionnaireForm;
