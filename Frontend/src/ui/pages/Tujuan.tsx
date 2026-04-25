import { motion } from 'motion/react';

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e21c70]">
        <path d="M22 10v6M2 10v6" />
        <path d="M6 12V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" />
        <rect x="2" y="16" width="20" height="4" rx="1" />
        <path d="M10 8h4" />
      </svg>
    ),
    title: "Wadah Kreativitas",
    description: "Memberikan wadah bagi siswa SMA/SMK untuk mengembangkan kreativitas dan potensi di bidang teknologi."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e21c70]">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "Inovasi Digital",
    description: "Meningkatkan minat generasi muda terhadap inovasi dan pengembangan teknologi digital."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e21c70]">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Problem Solving",
    description: "Mengembangkan kemampuan berpikir kritis, problem solving, serta kreativitas peserta."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e21c70]">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Jejaring Kolaborasi",
    description: "Membangun jejaring kolaborasi antara mahasiswa, siswa, and komunitas teknologi."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#e21c70]">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    title: "Generasi Unggul",
    description: "Mendorong lahirnya generasi muda yang inovatif, adaptif, dan berdaya saing nasional."
  }
];

export default function Tujuan() {
  return (
    <section id="Tujuan" className="py-10 bg-[#fffffe] overflow-hidden">
      <div className="relative flex overflow-x-hidden py-4">
        <motion.div 
          className="flex gap-6"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...cards, ...cards].map((card, index) => (
            <div 
              key={index}
              className="shrink-0 w-87.5 bg-white border border-[#191b37]/10 shadow-lg rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(226,28,112,0.4)] transition-all duration-300"
            >
              <div className="mb-6 bg-[#e21c70]/5 p-4 rounded-2xl border border-[#e21c70]/10">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#191b37] mb-4 font-mono">
                {card.title}
              </h3>
              <p className="text-[#191b37]/70 leading-relaxed text-sm font-mono">
                {card.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
