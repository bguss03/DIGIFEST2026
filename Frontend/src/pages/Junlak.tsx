import { motion } from "motion/react";
import { LuDownload, LuInfo, LuLayoutTemplate, LuLightbulb, LuMusic, LuMonitor } from "react-icons/lu";

const guidelines = [
  {
    id: "umum",
    title: "Juklak & Juknis Umum",
    icon: <LuInfo className="w-8 h-8 text-[#e21c70]" />,
    description: "Peraturan dasar dan informasi umum yang berlaku untuk seluruh rangkaian acara DIGIFEST.",
    details: [
      "Peserta wajib mengikuti seluruh rangkaian acara sesuai jadwal.",
      "Pendaftaran dilakukan melalui website resmi DIGIFEST.",
      "Peserta wajib menjaga etika dan sportivitas selama kompetisi.",
      "Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat."
    ],
    link: "#"
  },
  {
    id: "udc",
    title: "UI/UX Design Competition",
    icon: <LuLayoutTemplate className="w-8 h-8 text-[#e21c70]" />,
    description: "Detail teknis pengerjaan, kriteria penilaian, dan format pengumpulan karya UI/UX.",
    details: [
      "Karya harus orisinal dan belum pernah memenangkan kompetisi lain.",
      "Tools yang digunakan bebas (Figma, Adobe XD, dll).",
      "Format pengumpulan berupa link prototype dan dokumen presentasi.",
      "Penilaian meliputi aspek estetika, kegunaan, dan inovasi."
    ],
    link: "#"
  },
  {
    id: "siic",
    title: "System Innovation Idea Creative",
    icon: <LuLightbulb className="w-8 h-8 text-[#e21c70]" />,
    description: "Pedoman penyusunan proposal ide inovasi sistem informasi dan kriteria seleksi.",
    details: [
      "Ide harus aplikatif dan dapat memecahkan masalah nyata.",
      "Proposal disusun sesuai format yang telah ditentukan.",
      "Tahapan seleksi meliputi seleksi berkas dan presentasi final.",
      "Kriteria penilaian: Orisinalitas, Dampak, dan Kelayakan."
    ],
    link: "#"
  },
  {
    id: "cdc",
    title: "Creative Dance Competition",
    icon: <LuMusic className="w-8 h-8 text-[#e21c70]" />,
    description: "Ketentuan durasi, musik, kostum, dan penilaian kompetisi tari kreatif.",
    details: [
      "Durasi penampilan maksimal 3 - 10 menit.",
      "Musik bebas namun tidak mengandung unsur SARA.",
      "Kostum menyesuaikan tema tarian.",
      "Penilaian: Kreativitas, Teknik, Kekompakan, dan Ekspresi."
    ],
    link: "#"
  },
  {
    id: "ic",
    title: "IT Competition",
    icon: <LuMonitor className="w-8 h-8 text-[#e21c70]" />,
    description: "Panduan pameran karya teknologi dan kriteria penilaian inovasi mahasiswa.",
    details: [
      "Karya berupa aplikasi, hardware, atau solusi IT lainnya.",
      "Wajib menyertakan dokumentasi teknis.",
      "Presentasi dilakukan di booth pameran yang disediakan.",
      "Penilaian: Inovasi, Kesiapan Produk, dan Presentasi."
    ],
    link: "#"
  }
];

export default function Junlak() {
  return (
    <div className="min-h-screen bg-[#e9cfeb] bg-[radial-gradient(#e21c7011_1px,transparent_1px)] bg-size-[20px_20px] pt-32 pb-20 px-6 font-montserrat">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#191b37] mb-4">
            Juklak & Juknis
          </h1>
          <p className="text-[#191b37]/70 text-lg max-w-2xl mx-auto">
            Temukan panduan lengkap pelaksanaan dan petunjuk teknis untuk seluruh kategori lomba di DIGIFEST.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-4 bg-pink-100 rounded-2xl">
                {guidelines[0].icon}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#191b37] mb-2">{guidelines[0].title}</h2>
                <p className="text-[#191b37]/70 mb-4">{guidelines[0].description}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {guidelines[0].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#191b37]/80 text-sm">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e21c70] shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#e21c70] text-white rounded-xl font-bold hover:bg-[#c0175e] transition-all shadow-lg shadow-pink-200">
                  <LuDownload className="w-5 h-5" />
                  Download Juknis Umum
                </button>
              </div>
            </div>
          </motion.div>

          {guidelines.slice(1).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl flex flex-col h-full hover:border-[#e21c70]/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/60 rounded-xl shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#191b37]">{item.title}</h3>
              </div>
              
              <p className="text-[#191b37]/70 mb-6 grow">
                {item.description}
              </p>

              <div className="space-y-3 mb-8">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[#191b37]/80 text-sm">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e21c70] shrink-0" />
                    <p>{detail}</p>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#191b37] border border-pink-200 rounded-xl font-bold hover:bg-pink-50 transition-all">
                <LuDownload className="w-5 h-5" />
                Download Juknis
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
