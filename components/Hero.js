
// components/Hero.js

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const getRandomRotation = () => {
  const rotations = [0, 30, 45, 60];
  return rotations[Math.floor(Math.random() * rotations.length)];
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
    }, 1140);

    // Clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [isClicked, router]);

  useEffect(() => {
    setRotation(getRandomRotation());
  }, []);

  // Split the text into individual letters, including spaces
  const text = "Lorem Colors";
  const letters = text.split("");

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 ${isClicked ? bgGradient : "bg-white"
        }`}
    >
      <div className="max-w-7xl h-screen mx-auto relative z-10 flex flex-col lg:flex-row">
        {/* Text Section */}
        <div
          className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32 ${isClicked ? "bg-transparent" : ""
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
                className={`text-4xl leading-snug tracking-tight font-extrabold md:text-[54px] transition-colors duration-500 ${isClicked ? "text-white" : "text-black"
                  }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block">Everything</span>
                <span className="block">In black and white,</span>
                <span className="block">Till you click... </span>
              </motion.h1>

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
                      size="lg" // Default to 'lg' for mobile
                      className={`text-lg lg:text-xl ${buttonBg} text-white transition-colors duration-300 px-6 py-3 rounded-md`}
                      onClick={handleButtonClick}
                      disabled={isClicked}
                    >
                      Generate Palette
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </div>

        {/* Animated "Lorem Colors" SVG */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-2/3 mt-4 lg:mt-0 flex justify-center items-center transition-transform duration-500"
        >
          <motion.div
            className="w-full h-full"
            animate={{ scale: isClicked ? 1.06 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 300"
              className="w-full h-full object-contain"
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
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`black-${index}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isClicked ? 0 : 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.041, // Approximately 0.5s total for 12 letters
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.tspan>
                ))}
              </motion.text>

              {/* Gradient Text */}
              <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                fill="url(#gradient)"
                fontSize="90"
                fontWeight="bold"
                dy=".3em"
              >
                {letters.map((letter, index) => (
                  <motion.tspan
                    key={`gradient-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClicked ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.041, // Approximately 0.5s total for 12 letters
                    }}
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