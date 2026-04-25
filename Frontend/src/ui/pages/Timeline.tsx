import { motion } from "motion/react";

const timelineData = [
  { id: 1, title: "Pendaftaran Gelombang 1", date: "Sekarang – 15 Mei 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang pertama." },
  { id: 2, title: "Pendaftaran Gelombang 2", date: "16 Mei – 30 Mei 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang kedua." },
  { id: 3, title: "Pendaftaran Gelombang 3", date: "1 Juni - 14 Juni 2026", location: "Online", description: "Pendaftaran peserta lomba gelombang ketiga." },
  { id: 4, title: "Penutupan Pendaftaran", date: "15 Juni 2026", location: "Online", description: "Batas akhir pendaftaran seluruh kategori lomba." },
  { id: 5, title: "Technical Meeting Peserta", date: "16 Juni 2026", location: "Online", description: "Penjelasan teknis pelaksanaan lomba." },
  { id: 6, title: "Pengerjaan Karya GENETIC & D’NAMIC", date: "1 Mei – 30 Juni 2026", location: "Online", description: "Periode pengerjaan karya bagi peserta." },
  { id: 7, title: "Pengumpulan Karya GENETIC & D’NAMIC", date: "30 Juni 2026", location: "Online", description: "Batas akhir pengumpulan karya lomba." },
  { id: 8, title: "Seleksi & Penilaian Karya GENETIC & D’NAMIC", date: "1 Juli 2026", location: "Online", description: "Proses seleksi dan penilaian oleh juri." },
  { id: 9, title: "Pengumuman Finalis GENETIC & D’NAMIC", date: "2 Juli 2026", location: "Online", description: "Pengumuman peserta yang lolos ke babak final." },
  { id: 10, title: "Technical Meeting Finalis", date: "3 Juli 2026", location: "Online", description: "Penjelasan teknis babak final." },
  { id: 11, title: "Final Lomba GENETIC & D’NAMIC", date: "8 Juli 2026", location: "Offline", description: "Pelaksanaan babak final kategori utama." },
  { id: 12, title: "IT Competition (Pameran & Voting)", date: "8 Juli 2026", location: "Offline", description: "Pameran karya dan sesi voting juara favorit." },
  { id: 13, title: "Awarding Celebration (Penutupan)", date: "8 Juli 2026", location: "Offline", description: "Pengumuman pemenang dan penutupan acara." },
];

export default function Timeline() {
  return (
    <div className="bg-[#fffffe] py-20 relative overflow-hidden" id="Timeline">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e21c70] opacity-[0.03] rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e21c70] opacity-[0.03] rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center w-full max-w-2xl mb-6">
            <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-black uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Jadwal Acara
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl text-center font-bold text-[#191b37] tracking-tight leading-tight font-montserrat"
          >
            TIMELINE <span className="text-[#e21c70]">DIGIFEST</span> 2026
          </motion.h1>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-[#e21c70] via-[#e21c70]/50 to-transparent hidden md:block"></div>
          
          {/* Vertical Line - Mobile */}
          <div className="absolute left-4 transform h-full w-0.5 bg-linear-to-b from-[#e21c70] via-[#e21c70]/50 to-transparent md:hidden"></div>

          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-5/12 px-4 md:px-0 ml-12 md:ml-0">
                  <div className="bg-white border border-[#191b37]/10 shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-[0_0_20px_rgba(226,28,112,0.3)] transition-all duration-300 relative group">
                    {/* Location Badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#e21c70]/5 text-[#e21c70] border border-[#e21c70]/10">
                      {item.location}
                    </div>

                    <div className="flex flex-col">
                      <div className="mb-3 bg-[#e21c70]/5 w-10 h-10 rounded-xl flex items-center justify-center border border-[#e21c70]/10 text-[#e21c70] font-bold text-lg font-montserrat">
                        {item.id}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-[#191b37] mb-2 font-montserrat">
                        {item.title}
                      </h3>
                      
                      <p className="text-[#191b37]/70 text-xs sm:text-sm leading-relaxed mb-4 font-montserrat">
                        {item.description}
                      </p>

                      {/* Date Footer */}
                      <div className="flex items-center gap-3 pt-3 border-t border-[#191b37]/5">
                        <div className="w-4 h-4 rounded-full bg-[#e21c70]/5 flex items-center justify-center text-[#e21c70]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase font-bold text-gray-400 tracking-wider">Tanggal</p>
                          <p className="text-[#191b37] font-bold text-xs sm:text-sm font-montserrat">{item.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Dot on the line */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 z-20">
                  <div className="w-4 h-4 bg-white border-4 border-[#e21c70] rounded-full shadow-[0_0_10px_rgba(226,28,112,0.5)]"></div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
