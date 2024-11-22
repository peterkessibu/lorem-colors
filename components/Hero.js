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
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row">
        {/* Text Section */}
        <div
          className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32 ${isClicked ? "bg-transparent" : ""
            } w-full`}
        >
          {/* Decorative SVG */}
          <svg
            className={`hidden lg:block absolute right-0 inset-y-0 h-full transform translate-x-1/2 transition-colors duration-500 ${isClicked ? "text-white" : "text-black"
              }`}
            fill="white"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          ></svg>

          <main className="mt-6 mx-4 p-4 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-left"
            >
              {/* Main Heading */}
              <motion.h1
                className={`text-2xl leading-tight tracking-tight font-extrabold md:text-4xl ${isClicked ? "text-white" : "text-black"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block">Transform</span>
                <span className="block">Your Designs with Perfect</span>
                <span className={`${isClicked ? "text-white" : "text-primary"}`}>
                  Colors.
                </span>
              </motion.h1>

              {/* Subheading Paragraph */}
              <motion.p
                className={`mt-3 text-base leading-relaxed ${isClicked ? "text-white" : "text-gray-500"
                  } md:leading-relaxed md:text-lg sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Generate stunning color palettes tailored to your needs. Elevate
                your projects with AI-powered color recommendations and
                comprehensive analytics.
              </motion.p>
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
                      size="lg"
                      className={`text-lg ${buttonBg} text-white`}
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

        {/* Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-2/3 mt-8 lg:mt-0 flex justify-center items-center"
        >
          <motion.div
            className="w-full h-full"
            animate={{ rotateY: isClicked ? 0 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out"
              src={imageSrc}
              alt="Color palette illustration"
              width={900}
              height={900}
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}