"use client";

import { useState } from "react";
import { Copy, Check, Lock, Unlock } from "lucide-react";

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
                className="w-14 h-20 rounded-lg border border-gray-300 cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
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

export default ColorSwatch;