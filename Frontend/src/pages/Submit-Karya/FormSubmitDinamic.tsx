import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUser,
  FiLink,
  FiMusic,
  FiClock,
  FiStar,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Turnstile } from "@marsidev/react-turnstile";
import supabase from "@/lib/api/supabase-client";
import StatusModal from "@/components/ui/StatusModal";

type FormData = {
  namaTim: string;
  namaKetua: string;
  asalSekolah: string;
  noKetua: string;
  judulLagu: string;
  genreKonsep: string;
  durasiVideo: string;
  linkVideo: string;
  kategori: string;
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

export default function FormSubmitDinamic() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    status: "success" | "error" | "warning" | null;
    title: string;
    message: string | React.ReactNode;
    onAction?: () => void;
  }>({
    isOpen: false,
    status: null,
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState<FormData>({
    namaTim: "",
    namaKetua: "",
    asalSekolah: "",
    noKetua: "",
    judulLagu: "",
    genreKonsep: "",
    durasiVideo: "",
    linkVideo: "",
    kategori: "Creative Dance Competition",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    return (
      formData.namaTim.trim() !== "" &&
      formData.namaKetua.trim() !== "" &&
      formData.asalSekolah.trim() !== "" &&
      formData.noKetua.trim() !== "" &&
      formData.judulLagu.trim() !== "" &&
      formData.genreKonsep.trim() !== "" &&
      formData.durasiVideo.trim() !== "" &&
      formData.linkVideo.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (!turnstileToken) {
      setStatusModal({
        isOpen: true,
        status: "warning",
        title: "Verifikasi Diperlukan",
        message: "Mohon selesaikan verifikasi keamanan (Turnstile).",
        onAction: () => setStatusModal((p) => ({ ...p, isOpen: false })),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dbPayload = {
        nama_tim: formData.namaTim,
        nama_ketua: formData.namaKetua,
        asal_sekolah: formData.asalSekolah,
        no_whatsapp: formData.noKetua,
        judul_lagu: formData.judulLagu,
        genre_konsep: formData.genreKonsep,
        durasi_video: formData.durasiVideo,
        link_video_drive: formData.linkVideo,
        kategori: formData.kategori,
      };

      const { data, error: functionError } = await supabase.functions.invoke(
        "submit-karya",
        {
          body: {
            formData: dbPayload,
            turnstileToken,
          },
        }
      );

      if (functionError) throw new Error(functionError.message);
      if (data && data.error) throw new Error(data.error);

      setStatusModal({
        isOpen: true,
        status: "success",
        title: "Karya Berhasil Dikirim!",
        message: "Selamat! Karya tim dance Anda telah berhasil dikumpulkan. Panitia akan segera melakukan penilaian.",
        onAction: () => navigate("/"),
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatusModal({
        isOpen: true,
        status: "error",
        title: "Pengiriman Gagal",
        message: `Gagal mengirim karya. ${error.message}`,
        onAction: () => setStatusModal((p) => ({ ...p, isOpen: false })),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-transparent overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-xs sm:text-sm font-bold text-brand-sun uppercase tracking-[0.3em] mb-4">
            Pengumpulan Karya
          </h2>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-montserrat mb-4">
            Creative Dance <span className="text-brand-sun">Competition</span>
          </h1>
          <p className="text-white/70 text-sm">
            Silakan lengkapi form pengumpulan video di bawah ini.
          </p>
        </div>

        <motion.div className="bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Nama Tim */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Nama Tim
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiUsers />
                  </span>
                  <input
                    type="text"
                    name="namaTim"
                    required
                    value={formData.namaTim}
                    onChange={handleChange}
                    placeholder="Masukkan nama tim"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Nama Ketua */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Nama Ketua Tim
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    name="namaKetua"
                    required
                    value={formData.namaKetua}
                    onChange={handleChange}
                    placeholder="Nama lengkap ketua"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Asal Sekolah */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Asal Sekolah
                </label>
                <input
                  type="text"
                  name="asalSekolah"
                  required
                  value={formData.asalSekolah}
                  onChange={handleChange}
                  placeholder="Contoh: SMA Negeri 1 Semarang"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                />
              </motion.div>

              {/* No Whatsapp */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Nomor Whatsapp Ketua
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FaWhatsapp />
                  </span>
                  <input
                    type="tel"
                    name="noKetua"
                    required
                    value={formData.noKetua}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Judul Lagu */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Judul Lagu yang Dibawakan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiMusic />
                  </span>
                  <input
                    type="text"
                    name="judulLagu"
                    required
                    value={formData.judulLagu}
                    onChange={handleChange}
                    placeholder="Contoh: Lathi - Weird Genius"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Genre/Konsep */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Genre/Konsep Penampilan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiStar />
                  </span>
                  <input
                    type="text"
                    name="genreKonsep"
                    required
                    value={formData.genreKonsep}
                    onChange={handleChange}
                    placeholder="Contoh: Modern Dance / Tradisional Kontemporer"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Durasi Video */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Durasi Video Penampilan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiClock />
                  </span>
                  <input
                    type="text"
                    name="durasiVideo"
                    required
                    value={formData.durasiVideo}
                    onChange={handleChange}
                    placeholder="Contoh: 05:30"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Link Video */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Link Video Penampilan (Google Drive)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiLink />
                  </span>
                  <input
                    type="url"
                    name="linkVideo"
                    required
                    value={formData.linkVideo}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Turnstile */}
              <motion.div variants={itemVariants} className="flex justify-center pt-4">
                <Turnstile
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{ theme: "dark" }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-sun text-brand-midnight font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-brand-sun/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Memproses... <FiLoader className="animate-spin" /></>
                ) : (
                  <>Kumpulkan Karya <FiCheckCircle /></>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      <StatusModal
        isOpen={statusModal.isOpen}
        status={statusModal.status}
        title={statusModal.title}
        message={statusModal.message}
        onAction={statusModal.onAction}
        onClose={() => setStatusModal((p) => ({ ...p, isOpen: false }))}
      />
    </div>
  );
}
