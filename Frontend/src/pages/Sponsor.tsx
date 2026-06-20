import { motion } from 'motion/react';
import LogoLoop from '@/components/ui/LogoLoop';  
// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiVite, SiNodedotjs, SiMongodb } from 'react-icons/si';

const Sponsors = [
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  { src:"digifest.svg", title: "React", href: "https://react.dev" },
  
];

const MediaPartners = [
  { src:"forumosis.png", title: "forumosis", href: "https://www.instagram.com/forumosis.purbalingga?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"BEM-FTP.png", title: "BEM FTP", href: "https://www.instagram.com/bem_ftpusm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"forumosispekalongan.png", title: "forumosispekalongan", href: "https://www.instagram.com/fosis_pekalongan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"Himalika.png", title: "Himalika", href: "https://www.instagram.com/himalikausm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"ILPOL.png", title: "ILPOL", href: "https://www.instagram.com/hmjpolitik_uinws?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"Infovolunteers.jpg", title: "Infovolunteers", href: "https://www.instagram.com/infovolunteers?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"ingfonyadesain.png", title: "ingfonyadesain", href: "https://www.instagram.com/ingfonyadesain?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { src:"PI.jpg", title: "pusatinfolomba", href: "https://www.instagram.com/pusatinfolomba?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
];

export default function Sponsor() {
  return (
    <div id="Sponsor" className="py-20 bg-transparent overflow-hidden">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center w-full max-w-2xl mb-6">
            <div className="h-0.5 bg-linear-to-r from-transparent to-brand-sun grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-white uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Didukung Oleh
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-brand-sun grow rounded-full"></div>
          </div>


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl text-center font-bold text-white tracking-tight leading-tight font-mono"
          >
            Sponsor <span className="text-brand-sun">& Media Partner</span>
          </motion.h1>
          <p className="text-white max-w-2xl mx-auto font-mono text-center pt-5 opacity-80 sm:text-base text-sm">
            Terima kasih kepada sponsor dan media partner yang mendukung pertumbuhan event DIGIFEST 2026.
          </p>
        </div>

      <div className="relative w-full">
        <h1 className="text-center pb-5 font-mono text-white opacity-70">Sponsor</h1>
        <LogoLoop
          logos={Sponsors}
          speed={40}
          direction="left"
          logoHeight="clamp(60px, 12vw, 80px)"
          gap="clamp(30px, 8vw, 60px)"
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Sponsor logos"
        />
      </div>
      
      <div className="mt-12 relative w-full">
        <h1 className='text-center pb-5 font-mono text-white opacity-70'>Media Partner</h1>
        <LogoLoop
          logos={[...MediaPartners].reverse()}
          speed={40}
          direction="right"
          logoHeight="clamp(45px, 10vw, 60px)"
          gap="clamp(25px, 6vw, 50px)"
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Media partner logos reverse"
        />
      </div>
    </div>
  );
}
