import { motion } from 'motion/react';
import LogoLoop from '../../lib/LogoLoop';  
// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiVite, SiNodedotjs, SiMongodb } from 'react-icons/si';

const Sponsors = [
  { src:"digifest-logo1.svg", title: "React", href: "https://react.dev" },
  { src:"digifest-logo1.svg", title: "Next.js", href: "https://nextjs.org" },
  { src:"digifest-logo1.svg", title: "TypeScript", href: "https://www.typescriptlang.org" },
  { src:"digifest-logo1.svg", title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { src:"digifest-logo1.svg", title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { src:"digifest-logo1.svg", title: "Vite", href: "https://vitejs.dev" },
  { src:"digifest-logo1.svg", title: "Node.js", href: "https://nodejs.org" },
  { src:"digifest-logo1.svg", title: "MongoDB", href: "https://www.mongodb.com" },
];

const MediaPartners = [
  { src:"digifest-logo1.svg", title: "React", href: "https://react.dev" },
  { src:"digifest-logo1.svg", title: "Next.js", href: "https://nextjs.org" },
  { src:"digifest-logo1.svg", title: "TypeScript", href: "https://www.typescriptlang.org" },
  { src:"digifest-logo1.svg", title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { src:"digifest-logo1.svg", title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { src:"digifest-logo1.svg", title: "Vite", href: "https://vitejs.dev" },
  { src:"digifest-logo1.svg", title: "Node.js", href: "https://nodejs.org" },
  { src:"digifest-logo1.svg", title: "MongoDB", href: "https://www.mongodb.com" },
];

export default function Sponsor() {
  return (
    <div id="Sponsor" className="py-20 bg-[#e9cfeb] bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px] overflow-hidden">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center w-full max-w-2xl mb-6">
            <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-black uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Didukung Oleh
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
          </div>


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl text-center font-bold text-[#191b37] tracking-tight leading-tight font-mono"
          >
            Sponsor <span className="text-[#e21c70]">& Media Partner</span>
          </motion.h1>
          <p className="text-[#191b37] max-w-2xl mx-auto font-mono text-center pt-5 opacity-80 sm:text-base text-sm">
            Terima kasih kepada sponsor dan media partner yang mendukung pertumbuhan event DIGIFEST 2026.
          </p>
        </div>

      <div className="relative w-full">
        <h1 className="text-center pb-5 font-mono text-[#191b37] opacity-70">Sponsor</h1>
        <LogoLoop
          logos={Sponsors}
          speed={40}
          direction="left"
          logoHeight="clamp(60px, 12vw, 80px)"
          gap="clamp(30px, 8vw, 60px)"
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="e9cfeb"
          ariaLabel="Sponsor logos"
        />
      </div>
      
      <div className="mt-12 relative w-full">
        <h1 className='text-center pb-5 font-mono text-[#191b37] opacity-70'>Media Partner</h1>
        <LogoLoop
          logos={[...MediaPartners].reverse()}
          speed={40}
          direction="right"
          logoHeight="clamp(45px, 10vw, 60px)"
          gap="clamp(25px, 6vw, 50px)"
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="e9cfeb"
          ariaLabel="Media partner logos reverse"
        />
      </div>
    </div>
  );
}
