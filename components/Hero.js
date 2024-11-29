// components/Hero.js

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Function to get a random rotation angle
const getRandomRotation = () => {
  const rotations = [0, 30, 45, 60];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

// Animation variants for the container to stagger children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
};

// Animation variants for each letter
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Animation variants for the gradient text upon button click
const gradientVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
};

export default function Hero() {
  const [buttonBg, setButtonBg] = useState("bg-primary");
  const [isClicked, setIsClicked] = useState(false);
  const [bgGradient, setBgGradient] = useState("bg-white");
  const [rotation, setRotation] = useState(0);
  const router = useRouter();

  const handleButtonClick = useCallback(() => {
    if (isClicked) return;
    setIsClicked(true);
    setButtonBg("bg-[#8ff2fe] text-white");
    setBgGradient(
      "bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]",
    );
    const timeoutId = setTimeout(() => {
      router.push("/genAI-Color-Palette");
    }, 550);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [isClicked, router]);

  useEffect(() => {
    setRotation(getRandomRotation());
  }, []);

  // Split the text into individual letters, including spaces
  const text = "Lorem Colors.";
  const letters = text.split("");

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ${
        isClicked ? bgGradient : "bg-white"
      }`}
    >
      <div className="max-w-7xl min-h-screen mx-auto relative z-10 flex flex-col lg:flex-row">
        {/* Text Section */}
        <div
          className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32 ${
            isClicked ? "bg-transparent" : ""
          } w-full`}
        >
          <main className="mt-6 mx-4 p-4 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-left"
            >
              {/* Main Heading */}
              <motion.h1
                className={`text-4xl leading-snug tracking-tight font-extrabold transition-colors duration-500 ${
                  isClicked ? "text-white" : "text-black"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block">Transform Your Designs</span>
                <span className="block">with Perfect Colors.</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-5/6"
              >
                <span className="block leading-snug tracking-tight">
                  Generate stunning color palettes tailored to your needs. Elevate your projects with AI-powered color recommendations and comprehensive analytics.
                </span>
              </motion.div>
              {/* Generate Palette Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md">
                    <Button
                      variant="outline"
                      size="lg"
                      className={`text-lg lg:text-xl ${buttonBg} text-white transition-colors duration-300 px-6 py-3 rounded-md`}
                      onClick={handleButtonClick}
                      disabled={isClicked}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </div>

        {/* Animated "Lorem Colors" SVG with Per-Letter Animation */}
        <motion.div className="w-full lg:w-2/3 mt-4 lg:mt-0 flex justify-center items-center transition-transform duration-500">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isClicked ? 1.06 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 300"
              className="w-full h-full object-contain"
              aria-labelledby="gradient-title gradient-desc"
              role="img"
            >
              {/* Black Text */}
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="#000000"
                fontSize="90"
                fontWeight="bold"
                dy=".3em"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`black-${index}`}
                    variants={letterVariants}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.tspan>
                ))}
              </motion.text>

              {/* Gradient Text - Visible Only After Button Click */}
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient)"
                fontSize="90"
                fontWeight="bold"
                dy=".3em"
                variants={isClicked ? gradientVariants : containerVariants}
                initial={isClicked ? "hidden" : "hidden"}
                animate={isClicked ? "visible" : "hidden"}
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`gradient-${index}`}
                    variants={letterVariants}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.tspan>
                ))}
              </motion.text>

              <defs>
                <linearGradient
                  id="gradient"
                  gradientTransform={`rotate(${rotation})`}
                >
                  <stop offset="0%" stopColor="#ff0000" />
                  <stop offset="25%" stopColor="#ffa500" />
                  <stop offset="50%" stopColor="#00ff00" />
                  <stop offset="75%" stopColor="#0000ff" />
                  <stop offset="100%" stopColor="#800080" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
