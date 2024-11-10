"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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

export default QuestionnaireForm;