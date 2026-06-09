import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiCreditCard,
  FiAward,
  FiDownload,
  FiArrowRight,
  FiTarget,
  FiInfo,
  FiCalendar,
} from "react-icons/fi";

interface Competition {
  name: string;
  description: string;
  subTheme?: string;
}

interface SummaryCard {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineStep {
  title: string;
  date: string;
}

interface Guidebook {
  label: string;
  link: string;
}

interface EventData {
  title: string;
  subtitle?: string;
  description: string;
  link: string;
  guidebooks?: Guidebook[]; 
  competitions?: Competition[];
  summary?: SummaryCard[];
  timeline?: TimelineStep[];
  locationInfo?: string;
  linkSubmit?: string;
  hideSubmission?: boolean;
}

const eventDetails: Record<string, EventData> = {
  GNT: {
    title: "GENETIC",
    subtitle: "Generasi Teknologi Informasi Competition",
    description:
      "GENETIC merupakan kompetisi di bidang teknologi informasi yang ditujukan bagi siswa SMA/SMK sederajat untuk mengeksplorasi potensi digital mereka dan menghadirkan solusi kreatif.",
    link: "/FormGenetic",
    linkSubmit: "/SubmitGenetic",
    locationInfo:
      "Lomba terdiri dari Babak Penyisihan (Online) dan Babak Final (Offline) di Universitas Semarang.",
    guidebooks: [
      { label: "Guidebook UI/UX", link: "/GUIDEBOOK_LOMBA_UDC.pdf" },
      { label: "Guidebook SIIC", link: "/GUIDEBOOK_lOMBA_SIIC.pdf" },
    ],
    competitions: [
      {
        name: "UI/UX Design Competition",
        description:
          "Kompetisi ini menguji kemampuan peserta dalam merancang tampilan dan pengalaman pengguna yang intuitif, estetis, dan fungsional sesuai kebutuhan pengguna.",
        subTheme: "Solusi Digital Untuk Tantangan atau Masalah Sosial",
      },
      {
        name: "System Innovation Idea Competition",
        description:
          "Kompetisi ini menguji kemampuan peserta dalam merancang solusi inovatif berbasis teknologi untuk menjawab permasalahan sosial secara kreatif dan aplikatif.",
        subTheme: "Smart Society & Digital Solutions",
      },
    ],
    summary: [
      {
        label: "Kategori Peserta",
        value: "Tim (SMA/SMK)",
        description: "Siswa SMA/SMK sederajat (1 tim terdiri dari 3 orang).",
        icon: <FiUsers className="w-6 h-6" />,
      },
      {
        label: "Biaya Pendaftaran",
        value: "Rp. 50.000 - 60.000",
        description: "Early Bird: Rp. 50.000 | Normal: Rp. 60.000 (per tim).",
        icon: <FiCreditCard className="w-6 h-6" />,
      },
      {
        label: "Penghargaan",
        value: "Juara 1, 2, 3",
        description: "Uang Pembinaan dan Sertifikat Penghargaan.",
        icon: <FiAward className="w-6 h-6" />,
      },
    ],
    timeline: [
      { title: "Pendaftaran", date: "Sekarang – 30 Juni 2026" },
      { title: "Technical Meeting Peserta", date: "17 Juni 2026" },
      { title: "Pengumpulan Karya", date: "1 Juli 2026" },
      { title: "Seleksi & Penilaian Karya", date: "1 Juli – 3 Juli 2026" },
      { title: "Pengumuman Finalis", date: "3 Juli 2026" },
      { title: "Technical Meeting Finalis", date: "4 Juli 2026" },
      { title: "Final Lomba (Offline)", date: "9 Juli 2026" },
    ],
  },
  CDC: {
    title: "Creative Dance Competition",
    description:
      "Kompetisi dance modern yang menggabungkan kreativitas gerak dengan ekspresi artistik untuk menciptakan pertunjukan yang memukau and inovatif.",
    link: "/FormDinamic",
    linkSubmit: "/SubmitDinamic",
    locationInfo:
      "Lomba terdiri dari Babak Penyisihan (Online) dan Babak Final (Offline) di Universitas Semarang.",
    guidebooks: [
      { label: "Guidebook", link: "/GUIDEBOOK_LOMBA_CDC.pdf" },
    ],
    summary: [
      {
        label: "Kategori Peserta",
        value: "Tim (SMA/SMK)",
        description: "Grup tari modern (3 - 5 orang per tim).",
        icon: <FiUsers className="w-6 h-6" />,
      },
      {
        label: "Biaya Pendaftaran",
        value: "Rp. 50.000 - 60.000",
        description: "Early Bird: Rp. 50.000 | Normal: Rp. 60.000 (per tim).",
        icon: <FiCreditCard className="w-6 h-6" />,
      },
      {
        label: "Penghargaan",
        value: "Juara 1, 2, 3",
        description: "Sertifikat, Plakat, and Total Hadiah Jutaan Rupiah.",
        icon: <FiAward className="w-6 h-6" />,
      },
    ],
    timeline: [
      { title: "Pendaftaran", date: "Sekarang – 30 Juni 2026" },
      { title: "Technical Meeting Peserta", date: "17 Juni 2026" },
      { title: "Pengumpulan Karya", date: "1 Juli 2026" },
      { title: "Seleksi & Penilaian Karya", date: "1 Juli – 3 Juli 2026" },
      { title: "Pengumuman Finalis", date: "3 Juli 2026" },
      { title: "Technical Meeting Finalis", date: "4 Juli 2026" },
      { title: "Final Lomba (Offline)", date: "9 Juli 2026" },
    ],
  },
  IC: {
    title: "IT Competition",
    description:
      "IT Competition merupakan pameran karya and inovasi mahasiswa Universitas Semarang sebagai bentuk implementasi pembelajaran di bidang teknologi.",
    link: "/FormItcomp",
    hideSubmission: true,
    summary: [
      {
        label: "Kategori Peserta",
        value: "Mahasiswa USM",
        description:
          "Wajib bagi mahasiswa semester 6 prodi Teknik Infomatika dan Sistem Informasi.",
        icon: <FiUsers className="w-6 h-6" />,
      },
      {
        label: "Biaya Pendaftaran",
        value: "Rp. 50.000",
        description: "Rp. 50.000 (per tim).",
        icon: <FiCreditCard className="w-6 h-6" />,
      },
      {
        label: "Penghargaan",
        value: "Best Innovation",
        description: "Sertifikat.",
        icon: <FiAward className="w-6 h-6" />,
      },
    ],
    timeline: [
      { title: "Pendaftaran", date: "Sekarang – 30 Juni 2026" },
      { title: "Technical Meeting", date: "17 Juni 2026" },
      { title: "IT Competition (Pameran)", date: "9 Juli 2026" },
      { title: "Awarding Celebration (Penutupan)", date: "9 Juli 2026" },
    ],
  },
};

export default function Event() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/").pop() || "";
  const event = eventDetails[path] || {
    title: "Event Digifest",
    description:
      "Pilih salah satu kategori lomba di menu Event untuk melihat detail lebih lanjut.",
    link: "#",
  };

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-0 px-6 font-montserrat overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-brand-midnight/40 backdrop-blur-xl rounded-[3rem] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sun/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-sun/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <h2 className="text-brand-sun font-bold uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">
              {event.subtitle || "Kategori Lomba"}
            </h2>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-8 leading-tight">
              {event.title}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
              {event.description}
            </p>

            <div className="flex flex-col items-center gap-4">
              {/* Baris Atas: Daftar & Guidebook */}
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => event.link !== "#" && navigate(event.link)}
                  className="px-10 py-4 bg-brand-sun text-brand-midnight rounded-2xl font-bold shadow-xl shadow-brand-sun/20 hover:bg-brand-sun/80 hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  Daftar Sekarang{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                {event.guidebooks &&
                  event.guidebooks.map((gb, idx) => (
                    <a
                      key={idx}
                      href={gb.link}
                      target="_blank"
                      
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {gb.label} <FiDownload />
                    </a>
                  ))}
              </div>

              {/* Baris Bawah: Pengumpulan Karya */}
              {!event.hideSubmission && (
                <button
                  onClick={() =>
                    event.link !== "#" && event.linkSubmit && navigate(event.linkSubmit)
                  }
                  className="px-10 py-4 bg-brand-sun text-brand-midnight rounded-2xl font-bold shadow-xl shadow-brand-sun/20 hover:bg-brand-sun/80 hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  Pengumpulan Karya{" "}
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Competition Details Section (If Any) */}
        {event.competitions && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center w-full max-w-2xl mx-auto mb-6"
            >
              <div className="h-0.5 bg-linear-to-r from-transparent to-brand-sun grow rounded-full"></div>
              <h2 className="px-6 ml-[0.3em] text-sm sm:text-lg font-bold text-white uppercase tracking-[0.3em] text-center whitespace-nowrap">
                Kategori Lomba
              </h2>
              <div className="h-0.5 bg-linear-to-l from-transparent to-brand-sun grow rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {event.competitions.map((comp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-lg rounded-[2.5rem] p-8 border border-white/10 shadow-xl flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-sun/10 text-brand-sun flex items-center justify-center mb-6">
                    <FiTarget size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {comp.name}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-8 grow">
                    {comp.description}
                  </p>
                  {comp.subTheme && (
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-[10px] font-black uppercase text-brand-sun tracking-widest mb-1">
                        Sub Tema
                      </p>
                      <p className="text-white font-bold italic">
                        "{comp.subTheme}"
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Section */}
        {event.summary && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center w-full max-w-2xl mx-auto mb-6"
            >
              <div className="h-0.5 bg-linear-to-r from-transparent to-brand-sun grow rounded-full"></div>
              <h2 className="px-6 ml-[0.3em] text-sm sm:text-lg font-bold text-white uppercase tracking-[0.3em] text-center whitespace-nowrap">
                Summary
              </h2>
              <div className="h-0.5 bg-linear-to-l from-transparent to-brand-sun grow rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {event.summary.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="relative group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 overflow-hidden transition-all duration-500 hover:border-brand-sun/30 hover:shadow-[0_20px_40px_rgba(242,169,0,0.15)] flex flex-col"
                >
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-sun blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="text-brand-sun mb-6 group-hover:scale-110 transition-transform duration-500 origin-left relative z-10">
                    {item.icon}
                  </div>
                  <h4 className="text-brand-sun font-bold uppercase tracking-widest text-xs mb-2 relative z-10">
                    {item.label}
                  </h4>
                  <p className="text-white text-2xl font-black mb-3 leading-tight relative z-10">
                    {item.value}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed relative z-10">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Info Pelaksanaan */}
        {event.locationInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 rounded-4xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-start gap-5 shadow-sm"
          >
            <div className="mt-1 p-2 bg-brand-sun text-brand-midnight rounded-lg">
              <FiInfo size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-lg mb-1">
                Informasi Pelaksanaan
              </p>
              <p className="text-white/70 leading-relaxed font-medium">
                {event.locationInfo}
              </p>
            </div>
          </motion.div>
        )}

        {/* Timeline Section */}
        {event.timeline && (
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">
                Timeline
              </h2>
              <div className="w-20 h-1 bg-brand-sun mx-auto mt-4 rounded-full"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative border-l-2 border-white/10 ml-6 sm:ml-12 space-y-12 pb-8">
                {event.timeline.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-10"
                  >
                    <div className="absolute -left-2.75 top-0 w-5 h-5 rounded-full bg-brand-midnight border-4 border-brand-sun shadow-sm"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="text-xl font-bold text-white">
                        {step.title}
                      </h4>
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-sun text-sm font-bold shadow-sm self-start sm:self-center">
                        <FiCalendar /> {step.date}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Final Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 mb-10 text-center"
        >
          <p className="text-white/40 text-sm font-medium">
            Informasi lebih lanjut dapat menghubungi panitia melalui kontak yang
            tertera di bawah.
          </p>
        </motion.div>
      </div>
    </div>
  );
}