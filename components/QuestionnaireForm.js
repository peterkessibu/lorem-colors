// components/QuestionnaireForm.js

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
import colors from "@/lib/colors";

const colorNames = Object.keys(colors);

const QuestionnaireForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    primaryColor: "",
    backgroundColorPreference: "",
    contrastPreference: "Maintain",
    intendedMood: "",
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
        <Label className="text-sm font-semibold">
          Custom Color or Description
        </Label>
        <input
          value={answers.customDescription}
          className="w-full p-4 border border-gray-300 rounded-md"
          onChange={(e) => handleChange("customDescription", e.target.value)}
          placeholder=" (e.g., 'warm sunset hues,' 'cool oceanic tones,' or provide hex codes)."
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-semibold">Primary Color</Label>
        <Select
          value={answers.primaryColor}
          onValueChange={(value) => handleChange("primaryColor", value)}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select primary color" />
          </SelectTrigger>
          <SelectContent>
            {colorNames.map((colorName) => (
              <SelectItem key={colorName} value={colorName}>
                {colorName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-semibold">
          Background Color Preference
        </Label>
        <Select
          value={answers.backgroundColorPreference}
          onValueChange={(value) =>
            handleChange("backgroundColorPreference", value)
          }
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select background color preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-semibold">Contrast Preference</Label>
        <Select
          value={answers.contrastPreference}
          onValueChange={(value) => handleChange("contrastPreference", value)}
          disabled
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Maintain">Maintain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-sm font-semibold">Intended Mood</Label>
        <Select
          value={answers.intendedMood}
          onValueChange={(value) => handleChange("intendedMood", value)}
          required
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
