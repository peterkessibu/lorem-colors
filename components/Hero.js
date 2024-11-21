import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";


export default function Hero() {
  const [imageSrc, setImageSrc] = useState("/lorem-bg.png");
  const [buttonBg, setButtonBg] = useState("bg-primary");

  const handleButtonClick = () => {
    // Toggle between two images and button backgrounds
    if (imageSrc === "/lorem-bg.png") {
      setImageSrc("/new-image.png"); // Replace with your second image path
      setButtonBg("bg-secondary"); // Replace with your desired secondary color class
    } else {
      setImageSrc("/lorem-bg.png");
      setButtonBg("bg-primary");
    }
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="absolute lg:block hidden top-0 left-8 w-96 h-72 rounded-full bg-black bg-opacity-50 filter blur-lg z-0"></div>
        <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block xl:inline">
                  Everything in black and white
                </span>{" "}
                <span className="block text-primary xl:inline">
                  till you click...
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button variant="default" size="xl" className={`text-xl ${buttonBg}`} onClick={handleButtonClick}>
                      Generate Palette
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.p
              className="mt-3 text-base md:block hidden text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Generate stunning color palettes tailored to your needs. Elevate
              your projects with AI-powered color recommendations and
              comprehensive analytics.
            </motion.p>
          </main>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-40 w-full object-cover sm:h-60 md:h-80 lg:h-full lg:w-full transform rotate-0 md:rotate-3 lg:rotate-6 transition-transform duration-300 ease-in-out"
            src={imageSrc}
            alt="Color palette illustration"
            width={800}
            height={800}
            quality={90}
          />
        </div>
      </motion.div>
    </div>
  );
}
