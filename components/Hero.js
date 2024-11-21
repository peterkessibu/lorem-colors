import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [imageSrc, setImageSrc] = useState("/lorem-bg.png");
  const [buttonBg, setButtonBg] = useState("bg-primary");
  const [isClicked, setIsClicked] = useState(false);
  const [bgGradient, setBgGradient] = useState("bg-white");
  const router = useRouter();

  const handleButtonClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    setImageSrc("/globe.svg"); 
    setButtonBg("bg-[#1fddff]");
    setBgGradient("bg-gradient-to-tr from-blue-500 via-purple-500 to-yellow-500");

    setTimeout(() => {
      router.push("/color-palette");
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(); 
  }, []);

  return (
    <div
      className={`relative overflow-hidden min-h-screen transition-all duration-500 ${isClicked ? bgGradient : "bg-white"
        }`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Decorative Blur Circle */}
        {!isClicked && (
          <div className="absolute lg:block hidden top-0 bg-black left-8 w-96 h-72 rounded-full bg-opacity-50 filter blur-lg z-0"></div>
        )}

        <div
          className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 ${isClicked ? "bg-transparent" : ""
            }`}
        >
          {/* Decorative SVG */}
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full transform translate-x-1/2 transition-colors duration-500 ${isClicked ? "text-white" : "text-black"
              }`} 
            fill="white"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            
          </svg>

          <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:text-center lg:text-left"
            >
              {/* Main Heading */}
              <motion.h1
                className={`text-4xl leading-tight tracking-tight font-extrabold sm:text-5xl md:text-6xl ${isClicked ? "text-white" : "text-black"
                  }`} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} 
              >
                <span className="block">Everything in black and white</span>{" "}
                <span
                  className={`block ${isClicked ? "text-white" : "text-primary"
                    }`}
                >
                  till you click...
                </span>
              </motion.h1>

              {/* Generate Palette Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }} 
              >
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow-md">
                    <Button
                      variant="default"
                      size="xl"
                      className={`text-xl ${buttonBg} text-white`}
                      onClick={handleButtonClick}
                      disabled={isClicked}
                    >
                      Generate Palette
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Subheading Paragraph */}
              <motion.p
                className={`mt-3 text-base leading-relaxed ${isClicked ? "text-white" : "text-gray-500"
                  } md:leading-relaxed md:text-xl sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }} 
              >
                Generate stunning color palettes tailored to your needs. Elevate
                your projects with AI-powered color recommendations and
                comprehensive analytics.
              </motion.p>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} 
        className="hidden md:block"
      >
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2"
          animate={{ rotateY: isClicked ? 0 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out"
            src={imageSrc}
            alt="Color palette illustration"
            width={800}
            height={800}
            quality={90}
            priority
          />
        </motion.div>
      </motion.div>
    </div>
  );
}