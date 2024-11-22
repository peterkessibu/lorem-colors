import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Testimonials() {
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
    {
      content:
        "The seamless integration of Lorem Colors into our workflow has significantly boosted our productivity.",
      author: {
        name: "David Lee",
        role: "Product Manager, InnovateX",
        image: "/globe.svg",
      },
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  const carouselVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 relative flex flex-col items-center">
          {/* SVG Quote Icon */}
          <div className="absolute top-4 md:left-1/3 left-0 transform -translate-x-1/2 -translate-y-12 w-12 h-12 md:w-24 md:h-24 text-primary opacity-50 pointer-events-none">
            <svg
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
          </div>

          {/* Section Header */}
          <h2 className="text-3xl font-extrabold text-gray-900 text-center relative z-10">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600 text-center relative z-10">
            Trusted by designers and businesses worldwide.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8"
            variants={carouselVariants}
            animate={animate ? "animate" : ""}
            style={{ width: `${(duplicatedTestimonials.length / 3) * 100}%` }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-96"
              >
                {/* Testimonial Content */}
                <blockquote className="flex-1">
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
          </motion.div>
          {/* Blurred Gradient Overlay */}
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}