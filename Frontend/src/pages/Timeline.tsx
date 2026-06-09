import { motion } from "motion/react";
import { useRef } from "react";

const timelineData = [
  {
    id: 1,
    title: "Pendaftaran",
    date: "Sekarang – 30 Juni 2026",
    location: "Online",
    description: "Pendaftaran peserta lomba telah dibuka.",
    // Menambahkan field baru untuk detail harga agar mudah dikelola
    pricing: [
      {
        label: "Early Bird",
        price: "Rp50.000",
        note: "(15 pendaftar pertama/kategori)",
      },
      { label: "Normal Price", price: "Rp60.000", note: "" },
    ],
  },
  // { id: 2, title: "Pendaftaran Gelombang 2 (Normal Price)", date: "16 Mei – 30 Mei 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang kedua." },
  {
    id: 2,
    title: "Technical Meeting Peserta",
    date: "17 Juni 2026",
    location: "Online",
    description: "Penjelasan teknis pelaksanaan lomba.",
  },
  {
    id: 3,
    title: "Pengumpulan Karya GENETIC dan Creative Dance Competition",
    date: "1 Juli 2026",
    location: "Online",
    description: "Batas akhir pengumpulan karya lomba.",
  },
  {
    id: 4,
    title: "Seleksi & Penilaian Karya GENETIC dan Creative Dance Competition",
    date: "1 Juli – 3 Juli 2026",
    location: "Online",
    description: "Proses seleksi dan penilaian oleh juri.",
  },
  {
    id: 5,
    title: "Pengumuman Finalis GENETIC dan Creative Dance Competition",
    date: "3 Juli 2026",
    location: "Online",
    description: "Pengumuman peserta lomba yang lolos ke babak final.",
  },
  {
    id: 6,
    title: "Technical Meeting Finalis",
    date: "4 Juli 2026",
    location: "Online",
    description:
      "Pengarahan tata tertib dan persiapan teknis khusus bagi para finalis.",
  },
  {
    id: 7,
    title: "Final Lomba GENETIC & Creative Dance Competition",
    date: "9 Juli 2026",
    location: "Offline",
    description: "Pelaksanaan babak final lomba.",
  },
  {
    id: 8,
    title: "IT Competition (Pameran)",
    date: "9 Juli 2026",
    location: "Offline",
    description: "Pameran karya dan sesi voting juara favorit.",
  },
  {
    id: 9,
    title: "Awarding Celebration (Penutupan)",
    date: "9 Juli 2026",
    location: "Offline",
    description: "Pengumuman pemenang, pemberian penghargaan, dan hiburan.",
  },
];

export default function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen bg-transparent flex flex-col justify-center items-center relative overflow-hidden font-montserrat"
      id="Timeline"
    >
      

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center w-full max-w-2xl mb-6 py-15"
          >
            <div className="h-0.5 bg-linear-to-r from-transparent to-brand-sun grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-white uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Jadwal Acara
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-brand-sun grow rounded-full"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold text-white tracking-tight leading-tight"
          >
            TIMELINE <span className="text-brand-sun">DIGIFEST</span> 2026
          </motion.h1>
        </div>

        {/* Horizontal Timeline Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 py-10 px-4 no-scrollbar cursor-grab active:cursor-grabbing snap-x scroll-smooth pb-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
              <div className="bg-brand-midnight/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-4xl p-6 sm:p-8 hover:shadow-[0_0_30px_rgba(242,169,0,0.15)] transition-all duration-500 relative group grow flex flex-col">
                {/* ID & Location */}
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-brand-sun w-12 h-12 rounded-2xl flex items-center justify-center text-brand-midnight font-black text-xl shadow-lg shadow-brand-sun/20">
                    {item.id}
                  </div>
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-brand-sun/10 text-brand-sun border border-brand-sun/10">
                    {item.location}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight font-montserrat">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-medium mb-3">
                    {item.description}
                  </p>

                  {/* Render Pricing jika ada */}
                  {item.pricing && (
                    <div className="space-y-2 mt-4 bg-brand-sun/5 p-4 rounded-2xl border border-brand-sun/10">
                      {item.pricing.map((price, i) => (
                        <div key={i} className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              {price.label}
                            </span>
                            <span className="text-sm font-black text-brand-sun">
                              {price.price}
                            </span>
                          </div>
                          {price.note && (
                            <span className="text-[10px] text-white/50 font-medium italic">
                              {price.note}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Footer */}
                <div className="flex items-center gap-4 pt-5 border-t border-white/10 mt-auto">
                  <div className="w-5 h-5 rounded-xl bg-brand-sun/5 flex items-center justify-center text-brand-sun shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-white/40 tracking-widest">
                      Tanggal
                    </p>
                    <p className="text-white font-bold text-sm">
                      {item.date}
                    </p>
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
          className="flex flex-col items-center mt-4 mb-4 gap-3 text-white/40 font-bold text-[10px] uppercase tracking-[0.2em]"
        >
          <span>Geser</span>
          <div className="w-24 h-1 bg-white/5 rounded-full relative overflow-hidden">
            <motion.div
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-brand-sun/20 w-1/2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
