import LogoLoop from '../../lib/LogoLoop';  
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiVite, SiNodedotjs, SiMongodb } from 'react-icons/si';

const techLogos = [
  { node: <SiReact className="w-full h-full text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="w-full h-full text-[#000000]" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="w-full h-full text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="w-full h-full text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer className="w-full h-full text-[#0055FF]" />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiVite className="w-full h-full text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiNodedotjs className="w-full h-full text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMongodb className="w-full h-full text-[#47A248]" />, title: "MongoDB", href: "https://www.mongodb.com" },
];

export default function MediaPartner() {
  return (
    <div id="MediaPartner" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-mono text-[#191b37] mb-4">
          Our Media Partners
        </h2>
        <div className="w-24 h-1 bg-[#e21c70] mx-auto rounded-full mb-8"></div>
      </div>

      <div className="relative w-full">
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight="clamp(40px, 8vw, 80px)"
          gap="clamp(30px, 6vw, 100px)"
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="white"
          ariaLabel="Sponsor logos"
        />
      </div>
    </div>
  );
}
