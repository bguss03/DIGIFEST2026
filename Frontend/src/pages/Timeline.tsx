import { motion } from "motion/react";
import { useRef } from "react";

const timelineData = [
  { id: 1, title: "Pendaftaran Gelombang 1 (Early Bird)", date: "Sekarang – 15 Mei 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang pertama." },
  { id: 2, title: "Pendaftaran Gelombang 2 (Normal Price)", date: "16 Mei – 30 Mei 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang kedua." },
  { id: 3, title: "Technical Meeting Peserta", date: "16 Juni 2026", location: "Online", description: "Penjelasan teknis pelaksanaan lomba." },
  { id: 4, title: "Pengumpulan Karya GENETIC dan Creative Dance Competition", date: "1 Juni - 25 Juni 2026", location: "Online", description: "Batas akhir pengumpulan karya lomba." },
  { id: 5, title: "Seleksi & Penilaian Karya GENETIC dan Creative Dance Competition", date: "26 Juni – 4 Juli 2026", location: "Online", description: "Proses seleksi dan penilaian oleh juri." },
  { id: 6, title: "Pengumuman Finalis GENETIC dan Creative Dance Competition", date: "5 Juli 2026", location: "Online", description: "Pengumuman peserta lomba yang lolos ke babak final." },
  { id: 7, title: "Final Lomba GENETIC & Creative Dance Competition", date: "9 Juli 2026", location: "Offline", description: "Pelaksanaan babak final lomba." },
  { id: 8, title: "IT Competition (Pameran)", date: "9 Juli 2026", location: "Offline", description: "Pameran karya dan sesi voting juara favorit." },
  { id: 9, title: "Awarding Celebration (Penutupan)", date: "9 Juli 2026", location: "Offline", description: "Pengumuman pemenang, pemberian penghargaan, dan hiburan." },
];

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="min-h-screen bg-white bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px] flex flex-col justify-center items-center relative overflow-hidden font-montserrat" 
      id="Timeline"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e21c70] opacity-[0.05] rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e21c70] opacity-[0.05] rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center w-full max-w-2xl mb-6"
          >
            <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-black uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Jadwal Acara
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-[#191b37] tracking-tight leading-tight"
          >
            TIMELINE <span className="text-[#e21c70]">DIGIFEST</span> 2026
          </motion.h1>
        </div>

        {/* Horizontal Timeline Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-10 px-4 no-scrollbar cursor-grab active:cursor-grabbing snap-x scroll-smooth pb-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-70 sm:min-w-[320px] snap-center flex flex-col"
            >
              <div className="bg-white/90 backdrop-blur-md border border-[#191b37]/5 shadow-xl rounded-4xl p-6 sm:p-8 hover:shadow-[0_0_30px_rgba(226,28,112,0.15)] transition-all duration-500 relative group grow flex flex-col justify-between">
                {/* ID & Location */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-[#e21c70] w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-500/20">
                    {item.id}
                  </div>
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#e21c70]/10 text-[#e21c70] border border-[#e21c70]/10">
                    {item.location}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#191b37] mb-3 leading-tight font-montserrat">
                    {item.title}
                  </h3>
                  <p className="text-[#191b37]/70 text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Date Footer */}
                <div className="flex items-center gap-4 pt-5 border-t border-[#191b37]/5">
                  <div className="w-5 h-5 rounded-xl bg-[#e21c70]/5 flex items-center justify-center text-[#e21c70] shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Tanggal</p>
                    <p className="text-[#191b37] font-bold text-sm">{item.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Hint */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center mt-4 gap-3 text-[#191b37]/40 font-bold text-[10px] uppercase tracking-[0.2em]"
        >
          <span>Geser Horizontal</span>
          <div className="w-24 h-1 bg-[#191b37]/5 rounded-full relative overflow-hidden">
            <motion.div 
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#e21c70]/20 w-1/2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
