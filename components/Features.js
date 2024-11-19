'use client'

import { motion } from 'framer-motion'
import { Palette, BarChart, Cpu } from 'lucide-react'

const features = [
  {
    name: 'Color Palette Generation',
    description: 'Create customized color schemes effortlessly with our intuitive interface.',
    icon: Palette,
  },
  {
    name: 'Dashboard Analytics',
    description: 'Monitor your color usage and trends with comprehensive visual reports.',
    icon: BarChart,
  },
  {
    name: 'AI Integration',
    description: 'Leverage AI for intelligent color recommendations tailored to your brand.',
    icon: Cpu,
  },
]

export function FeaturesComponent() {
  return (
    <div className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to create colors
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem Colors provides powerful tools to enhance your design workflow and create stunning color palettes.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}