import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

export default function Faq() {
  interface FaqData {
    pertanyaan: string;
    jawaban: string;
  }

  const faqData: FaqData[] = [
    {
      pertanyaan: "Apa itu DIGIFEST?",
      jawaban:
        "Digital Innovation Grand Festival (DIGIFEST) merupakan kegiatan festival inovasi dan kompetisi teknologi tingkat nasional yang diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi (HIMMATISI) Universitas Semarang bekerja sama dengan Developer Community Universitas Semarang (DECOMUS).",
    },
    {
      pertanyaan: "Kapan DIGIFEST 2026 akan diselenggarakan?",
      jawaban:
        "DIGIFEST 2026 akan diselenggarakan pada bulan Mei hingga Juli 2026. Pendaftaran dibuka pada bulan Mei 2026, pengumpulan karya pada bulan Juni, penyisihan pada awal Juli, dan final pada bulan Juli 2026.",
    },
    {
      pertanyaan: "Siapa yang dapat mengikuti DIGIFEST 2026?",
      jawaban:
        "Peserta kompetisi ini terbuka untuk siswa aktif SMA/SMK/MA atau sederajat di seluruh Indonesia, sementara pameran teknologi dikhususkan bagi mahasiswa Universitas Semarang, dan seluruh rangkaian acara dapat dihadiri oleh pelajar, mahasiswa, serta masyarakat umum sebagai pengunjung.",
    },
    {
      pertanyaan: "Apakah ada biaya pendaftaran?",
      jawaban:
        "Informasi mengenai biaya pendaftaran dan prosedur teknis akan diinformasikan lebih lanjut melalui media sosial resmi DIGIFEST. Pantau terus akun resmi kami untuk update terbaru.",
    },
  ];

  const [pilihData, setPilihData] = useState<number | null>(null);

  const lihatJawaban = (index: number) => {
    setPilihData(pilihData === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 relative overflow-hidden" id="Faq">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#e21c70]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#191b37]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center w-full max-w-2xl mb-8"
          >
            <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-[#191b37] uppercase tracking-[0.4em] text-center whitespace-nowrap">
              FAQ
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl  text-center font-bold text-[#191b37] font-montserrat leading-tight"
          >
            Pertanyaan <span className="text-[#e21c70]">Umum</span>
          </motion.h1>
        </div>

        {/* FAQ Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-5"
        >
          {faqData.map((d, index) => {
            const isOpen = pilihData === index;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? "border-[#e21c70]/30 bg-white shadow-2xl shadow-[#e21c70]/10" 
                    : "border-gray-200 bg-white/40 backdrop-blur-sm hover:border-[#e21c70]/20 hover:bg-white/80"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  onClick={() => lihatJawaban(index)}
                >
                  <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                    isOpen ? "text-[#e21c70]" : "text-[#191b37]"
                  }`}>
                    {d.pertanyaan}
                  </span>
                  <motion.div
                    animate={{ 
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? "#e21c70" : "rgba(243, 244, 246, 1)",
                      color: isOpen ? "#ffffff" : "#191b37"
                    }}
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                  >
                    <HiChevronDown size={22} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-8 pt-2">
                        <div className="h-px w-full bg-linear-to-r from-[#e21c70]/20 via-[#e21c70]/10 to-transparent mb-6"></div>
                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                          {d.jawaban}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}