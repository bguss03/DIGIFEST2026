import ShinyText from "../../lib/ShinyText";
import Countdown from "../../components/layout/Countdown";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div
      id="Beranda"
      className="pt-35 pb-10 flex flex-col items-center bg-[#e9cfeb] bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px] py-16 px-6 min-h-screen 
      tserrat
                    sm:justify-center gap-10 sm:gap-20 sm:flex-row lg:pt-20 sm:pt-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/digifest-logo1.svg"
          alt="Digifest Logo"
          className="h-48 w-48 sm:h-80 sm:w-80"
        />
      </motion.div>

      <div className="text-center flex flex-col items-center justify-center font-bold font-montserrat">
        <motion.h1
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat text-2xl sm:text-4xl lg:text-6xl text-[#191b37]"
        >
          Are You Ready?
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ShinyText
            text="DIGIFEST 2026"
            speed={2}
            delay={0}
            color="#e21c70"
            shineColor="#191b37"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-4xl lg:text-8xl sm:text-5xl drop-shadow-[0_0_15px_rgba(226,28,112,0.6)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-sm sm:text-4xl font-montserrat text-[#191b37]">
            Digital Innovation Grand Festival
          </h1>
        </motion.div>

        {/* Fitur Hitung Mundur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Countdown />
        </motion.div>
      </div>
    </div>
  );
}
