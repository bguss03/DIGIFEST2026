import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDownDate = new Date("2026-06-15T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padNum = (num: number) => String(num).padStart(2, "0");

 const boxStyle = "bg-[#e76297] text-white text-3xl sm:text-3xl lg:text-5xl font-bold py-3 sm:py-4 w-16 sm:w-20 lg:w-28 flex justify-center items-center tabular-nums rounded-xl drop-shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,28,112,0.4)] border-b-4 border-[#e9cfeb]";

  return (
    <div className="flex flex-col items-center gap-6 font-montserrat">
      <div className="text-center">
        <h1 className="text-sm sm:text-sm lg:text-sm font-bold text-[#191b37] opacity-50 ">
          Pendaftaran Terakhir
        </h1>
      </div>

      <div className="flex gap-0 sm:gap-6 text-center items-start">
        {/* Hari */}
        <div className="flex flex-col items-center group">
          <div className={boxStyle}>
            {padNum(timeLeft.days)}
          </div>
          <span className="text-[#191b37] text-[10px] sm:text-sm font-bold mt-2 uppercase tracking-widest group-hover:text-[#e21c70] transition-colors">
            Hari
          </span>
        </div>
        <div className="text-[#191b37] text-2xl sm:text-4xl font-bold mt-3 sm:mt-4 animate-pulse">
          :
        </div>
        {/* Jam */}
        <div className="flex flex-col items-center group">
          <div className={boxStyle}>
            {padNum(timeLeft.hours)}
          </div>
          <span className="text-[#191b37] text-[10px] sm:text-sm font-bold mt-2 uppercase tracking-widest group-hover:text-[#e21c70] transition-colors">
            Jam
          </span>
        </div>
        <div className="text-[#191b37] text-2xl sm:text-4xl font-bold mt-3 sm:mt-4 animate-pulse">
          :
        </div>

        {/* Menit */}
        <div className="flex flex-col items-center group">
          <div className={boxStyle}>
            {padNum(timeLeft.minutes)}
          </div>
          <span className="text-[#191b37] text-[10px] sm:text-sm font-bold mt-2 uppercase tracking-widest group-hover:text-[#e21c70] transition-colors">
            Menit
          </span>
        </div>
        <div className="block text-[#191b37] text-2xl sm:text-4xl font-bold mt-4 animate-pulse">
          :
        </div>
        {/* Detik */}
        <div className="sm:flex flex-col items-center group">
          <div className={boxStyle}>
            {padNum(timeLeft.seconds)}
          </div>
          <span className="text-[#191b37] text-[10px] sm:text-sm font-bold mt-2 uppercase tracking-widest group-hover:text-[#e21c70] transition-colors">
            Detik
          </span>
        </div>
      </div>
    </div>
  );
}