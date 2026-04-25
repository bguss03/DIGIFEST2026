import { motion } from "motion/react";

const categories = [
  {
    title: "GENETIC",
    date: "1 Mei 2026 - 8 Juli 2026",
    location: "Online & Offline (USM)",
    description:
      "GENETIC merupakan kompetisi di bidang teknologi informasi yang ditujukan bagi siswa SMA/SMK sederajat untuk mengeksplorasi potensi digital mereka.",
    tags: ["UI/UX Design", "Innovation System Challenge"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: "from-pink-500/20 to-purple-500/20",
    glow: "shadow-pink-500/20",
  },
  {
    title: "D’NAMIC",
    date: "1 Mei 2026 - 8 Juli 2026",
    location: "Online & Offline (USM)",
    description:
      "D’NAMIC merupakan kompetisi seni tari sebagai wadah kreativitas dan ekspresi generasi muda dalam melestarikan budaya melalui inovasi.",
    tags: ["Seni Tari", "Kreativitas", "Ekspresi"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    color: "from-blue-500/20 to-indigo-500/20",
    glow: "shadow-blue-500/20",
  },
  {
    title: "IT COMPETITION & AWARDING",
    date: "8 Juli 2026",
    location: "Auditorium USM",
    description:
      "Pameran inovasi teknologi mahasiswa FTIK sebagai sarana apresiasi dan edukasi, ditutup dengan Awarding Celebration yang meriah.",
    tags: ["Pameran", "Networking", "Awarding"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    color: "from-yellow-500/20 to-orange-500/20",
    glow: "shadow-yellow-500/20",
  },
];

export default function Kategori() {
  return (
    <div id="Kategori" className="bg-[#e9cfeb] bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px] py-16 px-6 min-h-screen font-montserrat">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center w-full max-w-2xl mx-auto mb-6"
        >
          <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
          <h2 className="px-6 ml-[0.3em] text-sm sm:text-lg font-bold text-black uppercase tracking-[0.3em] text-center whitespace-nowrap">
            Kegiatan Utama
          </h2>
          <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            ease: [0.21, 0.47, 0.32, 0.98] 
          }}
          className="px-4 text-3xl sm:text-4xl text-center font-bold mb-12 text-[#191b37] font-montserrat"
        >
          Kategori <span className="text-[#e21c70]">Lomba</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 15,
                mass: 1,
                delay: index * 0.15 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="relative group bg-[#fffffe] rounded-3xl p-5 sm:p-6 border border-white/10 overflow-hidden flex flex-col transition-all duration-500 hover:border-[#e21c70]/30 hover:shadow-[0_20px_40px_rgba(226,28,112,0.15)]"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 hover:shadow-[0_0_20px_rgba(226,28,112,0.4)] transition-all duration-300`}
              />

              <div className="relative z-10 grow flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#e21c70] group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#191b37] leading-tight uppercase font-montserrat
                   tracking-wide pt-1 min-h-14 flex items-center">
                    {item.title}
                  </h3>
                </div>

                {/* Info List */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-3 text-[#191b37] font-semibold text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 text-[#e21c70]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#191b37] font-semibold text-xs sm:text-sm">
                    <svg
                      className="w-4 h-4 text-[#e21c70]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Deskripsi */}
                <p className="text-[#191b37]/70 text-xs sm:text-sm leading-relaxed mb-4 font-montserrat
                ">
                  {item.description}
                </p>

                {/* Spacer to push tags down */}
                <div className="grow" />

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {item.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="px-3 py-1 rounded-lg bg-[#e21c70]/5 text-[#e21c70] text-[10px] sm:text-xs font-bold border border-[#e21c70]/10 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button Section */}
              <div className="relative z-10 mt-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-[#e21c70] text-white rounded-xl font-bold text-sm transition-all duration-300 hover:bg-[#c11860] hover:shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2 group/btn
                  hover:cursor-pointer"
                >
                  <span>Daftar Sekarang</span>
                  <svg
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.button>
              </div>

              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#e21c70] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
