import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      content:
        "Lorem Colors has revolutionized our design process. The AI-powered recommendations are spot-on!",
      author: {
        name: "Sarah Johnson",
        role: "Lead Designer, TechCorp",
        image: "/globe.svg",
      },
    },
    {
      content:
        "It is easy to transform our brand identity with Lorem Colors. The color palettes are always on point!",
      author: {
        name: "Michael Chen",
        role: "Creative Director, DesignHub",
        image: "/globe.svg",
      },
    },
    {
      content:
        "Lorem Colors has become an essential tool in our branding projects. Highly recommended for all UI designs!",
      author: {
        name: "Emily Rodriguez",
        role: "Brand Strategist, BrandWorks",
        image: "/globe.svg",
      },
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600 text-center">
            Trusted by designers and businesses worldwide.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="mt-10 md:hidden relative">
          <AnimatePresence>
            <motion.div
              key={current}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full overflow-hidden"
            >
              <svg
                className="absolute top-0 left-0 transform -translate-x-8 -translate-y-16 w-24 h-24 text-primary opacity-50"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 144 144"
                aria-hidden="true"
              >
                <path
                  strokeWidth={2}
                  d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                />
              </svg>

              {/* Testimonial Content */}
              <motion.div
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <blockquote className="relative z-10 flex-1">
                  <div className="text-gray-700 text-base leading-relaxed mb-6">
                    “{testimonials[current].content}”
                  </div>
                  <footer className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-12 w-12 rounded-full"
                        src={testimonials[current].author.image}
                        alt={`Testimonial author ${testimonials[current].author.name}`}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {testimonials[current].author.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonials[current].author.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tablet and Desktop Grid */}
        <div className="mt-12 hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col relative"
            >
              {/* Decorative SVG */}
              <svg
                className="absolute top-0 left-0 transform -translate-x-8 -translate-y-16 w-24 h-24 text-primary opacity-50 hidden md:block"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 144 144"
                aria-hidden="true"
              >
                <path
                  strokeWidth={2}
                  d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                />
              </svg>

              {/* Testimonial Content */}
              <blockquote className="relative z-10 flex-1">
                <div className="text-gray-700 text-base leading-relaxed mb-6">
                  “{testimonial.content}”
                </div>
                <footer className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full"
                      src={testimonial.author.image}
                      alt={`Testimonial author ${testimonial.author.name}`}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.author.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
