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
    contrastPreference: "",
    intendedMood: "",
  });

  const handleChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <div className="mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primary Color */}
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
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-[15px] h-[15px]"
                      style={{ backgroundColor: colors[colorName][500] }}
                    ></div>
                    <span>{colorName}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Background Color Preference */}
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
              <SelectValue placeholder="Background theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Light">Light</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contrast Preference */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">Contrast Preference</Label>
          <Select
            value={answers.contrastPreference}
            onValueChange={(value) =>
              handleChange("contrastPreference", value)
            }
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Contrast preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High Contrast">High Contrast</SelectItem>
              <SelectItem value="Low Contrast">Low Contrast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Intended Mood */}
        <div className="space-y-1">
          <Label className="text-sm font-semibold">Intended Mood</Label>
          <Select
            value={answers.intendedMood}
            onValueChange={(value) => handleChange("intendedMood", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Intended mood" />
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

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Generate Palettes
        </Button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;