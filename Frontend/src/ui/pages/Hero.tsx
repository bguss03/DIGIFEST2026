import ShinyText from "../../lib/ShinyText";
// import TextType from "../../lib/TextType";

export default function Hero() {
  return (
    <div className="flex flex-col items-center">
      <div className="pt-15 text-center min-h-screen flex flex-col items-center justify-center text-8xl font-bold font-mono">
        <h1 className="font-mono text-2xl sm:text-6xl text-[#191b37]">Are You Ready?</h1>
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
          className="text-4xl sm:text-8xl"
        />
        <div className="">
         <h1 className="text-sm sm:text-4xl font-mono text-[#191b37]">
  Digital Innovation Grand Festival
</h1>
        </div>
      </div>
    </div>
  );
}
