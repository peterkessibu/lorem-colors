import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-gradient-to-t from-blue-600 via-violet-700 to-pink-600">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-extrabold text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block">Ready to elevate your designs?</span>
          <span className="block">Start creating with Lorem Colors today.</span>
        </motion.h2>
        <motion.p
          className="mt-4 text-lg leading-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join thousands of designers and businesses using Lorem Colors to
          create stunning color palettes and improve their design workflow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href={"/color-palette"}>
            <Button
              variant="secondary"
              size="lg"
              className="mt-8 w-full sm:w-auto"
            >
              Start Creating Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
