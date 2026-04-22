import ShinyText from "../../lib/ShinyText";
import Countdown from "../../components/layout/Countdown";

export default function Hero() {

  return (
   <div className="pt-35 pb-10 px-4 flex flex-col items-center 
                    sm:justify-center gap-10 sm:gap-20 min-h-screen sm:flex-row lg:pt-20 sm:pt-0">
      
      <div>
        <img src="/digifest-logo1.svg" alt="Digifest Logo" className="h-48 w-48 sm:h-80 sm:w-80"/> 
      </div>

      <div className="text-center flex flex-col items-center justify-center font-bold font-mono">
        <h1 className="font-mono text-2xl sm:text-4xl lg:text-6xl text-[#191b37]">Are You Ready?</h1>
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
        <div className="mb-8">
          <h1 className="text-sm sm:text-4xl font-mono text-[#191b37]">
            Digital Innovation Grand Festival
          </h1>
        </div>

        {/* Fitur Hitung Mundur */}
        <Countdown />
      </div>
    </div>
  );
}