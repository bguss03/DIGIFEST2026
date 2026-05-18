import ShinyText from "@/components/ui/ShinyText";
import Countdown from "@/components/layout/Countdown";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div
      id="Beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Hero Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: 'url("/hero-back.png")' }}
      />
      
      {/* Brand Gradient Overlay for depth and readability */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-brand-midnight/40 via-brand-midnight/20 to-brand-midnight/60" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 pt-20 pb-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center flex flex-col items-center justify-center font-bold font-montserrat w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-montserrat text-xl sm:text-3xl lg:text-5xl text-white mb-2 tracking-tight uppercase"
          >
            Are You Ready?
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <ShinyText
              text="DIGIFEST 2026"
              speed={3}
              delay={0}
              color="#F2A900"
              shineColor="#FFFFFF"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
              className="text-5xl sm:text-7xl lg:text-9xl drop-shadow-[0_0_30px_rgba(242,169,0,0.4)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-10 space-y-4"
          >
            <h2 className="text-lg sm:text-3xl lg:text-4xl font-montserrat text-white tracking-widest uppercase">
              Digital Innovation Grand Festival
            </h2>
            <div className="h-1 w-24 bg-brand-sun mx-auto rounded-full" />
            <p className="text-sm sm:text-lg opacity-80 font-montserrat text-white max-w-2xl text-center mx-auto leading-relaxed">
              Rayakan kreativitas dan kompetisi inovasi digital tingkat nasional bersama ribuan peserta dari seluruh Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full"
          >
            <Countdown />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
