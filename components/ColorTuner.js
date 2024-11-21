"use client"

import React, { useState, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const ColorBox = () => {
  const [baseColor, setBaseColor] = useState("#f43f5e")
  const [colorShades, setColorShades] = useState({})
  const [shadeCount, setShadeCount] = useState(10)

  const generateShades = (color, count) => {
    const shades = {}
    const hsl = hexToHSL(color)
    
    for (let i = 0; i < count; i++) {
      const lightness = 100 - (i / (count - 1)) * 100
      const hex = hslToHex(hsl.h, hsl.s, lightness)
      shades[i] = hex
    }

    return shades
  }

  const hexToHSL = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) throw new Error("Invalid hex color")
    
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2
    
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: break
      }
      h /= 6
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = (h, s, l) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  useEffect(() => {
    setColorShades(generateShades(baseColor, shadeCount))
  }, [baseColor, shadeCount])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Color Palette Generator</CardTitle>
        <CardDescription>Customize your color palette with various shades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label>Base Color</Label>
            <HexColorPicker color={baseColor} onChange={setBaseColor} />
            <Input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Number of Shades: {shadeCount}</Label>
            <Slider
              value={[shadeCount]}
              onValueChange={(value) => setShadeCount(value[0])}
              min={5}
              max={20}
              step={1}
              className="mt-2"
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
              {Object.entries(colorShades).map(([shade, color]) => (
                <div key={shade} className="flex items-center">
                  <div
                    className="w-8 h-8 rounded mr-2"
                    style={{ backgroundColor: color }}
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      const newShades = { ...colorShades, [shade]: e.target.value }
                      setColorShades(newShades)
                    }}
                    className="flex-grow"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button className="mt-4" onClick={() => console.log(colorShades)}>
          Copy Color Palette
        </Button>
      </CardContent>
    </Card>
  )
}

export default ColorBox