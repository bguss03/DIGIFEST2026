import { motion } from "motion/react";
import {
  LuDownload,
  LuLayoutTemplate,
  LuLightbulb,
  LuMonitor,
  LuMusic,
} from "react-icons/lu";

const guidelines = [
  // {
  //   id: "umum",
  //   title: "Guidebook Umum",
  //   icon: <LuInfo className="w-8 h-8 text-brand-sun" />,
  //   description: "Peraturan dasar dan informasi umum yang berlaku untuk seluruh rangkaian acara DIGIFEST.",
  //   details: [
  //     "Peserta wajib mengikuti seluruh rangkaian acara sesuai jadwal.",
  //     "Pendaftaran dilakukan melalui website resmi DIGIFEST.",
  //     "Peserta wajib menjaga etika dan sportivitas selama kompetisi.",
  //     "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat."
  //   ],
  //   link: "#"
  // },
  {
    id: "udc",
    title: "UI/UX Design Competition",
    icon: <LuLayoutTemplate className="w-8 h-8 text-brand-sun" />,
    description:
      "Detail teknis pengerjaan, kriteria penilaian, dan format pengumpulan karya UI/UX.",
    details: [
      "Karya harus orisinal dan belum pernah memenangkan kompetisi lain.",
      "Tools yang digunakan bebas (Figma, Adobe XD, dll).",
      "Format pengumpulan berupa link prototype dan dokumen presentasi.",
      "Penilaian meliputi aspek estetika, kegunaan, dan inovasi.",
    ],
    link: "GUIDEBOOK_LOMBA_UDC.pdf",
  },
  {
    id: "siic",
    title: "System Innovation Idea Competition",
    icon: <LuLightbulb className="w-8 h-8 text-brand-sun" />,
    description:
      "Pedoman penyusunan proposal ide inovasi sistem informasi dan kriteria seleksi.",
    details: [
      "Ide harus aplikatif dan dapat memecahkan masalah nyata.",
      "Proposal disusun sesuai format yang telah ditentukan.",
      "Tahapan seleksi meliputi seleksi berkas dan presentasi final.",
      "Kriteria penilaian: Orisinalitas, Dampak, dan Kelayakan.",
    ],
    link: "GUIDEBOOK_lOMBA_SIIC.pdf",
  },
  {
    id: "cdc",
    title: "Creative Dance Competition",
    icon: <LuMusic className="w-8 h-8 text-brand-sun" />,
    description:
      "Ketentuan durasi, musik, kostum, dan penilaian kompetisi tari kreatif.",
    details: [
      "Durasi penampilan maksimal 3 - 10 menit.",
      "Musik bebas namun tidak mengandung unsur SARA.",
      "Kostum menyesuaikan tema tarian.",
      "Penilaian: Kreativitas, Teknik, Kekompakan, dan Ekspresi.",
    ],
    link: "GUIDEBOOK_LOMBA_CDC.pdf",
  },
  {
    id: "ic",
    title: "IT Competition",
    icon: <LuMonitor className="w-8 h-8 text-brand-sun" />,
    description:
      "Panduan pameran karya teknologi dan kriteria penilaian inovasi mahasiswa.",
    details: [
      "Karya berupa aplikasi, hardware, atau solusi IT lainnya.",
      "Wajib menyertakan dokumentasi teknis.",
      "Presentasi dilakukan di booth pameran yang disediakan.",
      "Penilaian: Inovasi, Kesiapan Produk, dan Presentasi.",
    ],
    link: "GUIDEBOOK_IC.pdf",
  },
];

export default function Junlak() {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-6 font-montserrat ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
            GUIDEBOOK
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Temukan panduan lengkap pelaksanaan dan petunjuk teknis untuk
            seluruh kategori lomba di DIGIFEST.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guidelines.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-midnight/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl flex flex-col h-full hover:border-brand-sun/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>

              <p className="text-white/70 mb-6 grow">{item.description}</p>

              <div className="space-y-3 mb-8">
                {item.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-white/80 text-sm"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-sun shrink-0" />
                    <p>{detail}</p>
                  </div>
                ))}
              </div>

              {item.link && item.link !== "#" && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  <LuDownload className="w-5 h-5" />
                  Download Guidebook
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
