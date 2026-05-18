import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUser,
  FiLink,
  FiYoutube,
  FiFileText,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Turnstile } from "@marsidev/react-turnstile";
import supabase from "@/lib/api/supabase-client";
import StatusModal from "@/components/ui/StatusModal";

type FormData = {
  namaTim: string;
  asalSekolah: string;
  namaKetua: string;
  noKetua: string;
  judulInovasi: string;
  linkProposal: string;
  linkYoutube: string;
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

export default function FormSubmitGenetic() {
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
    asalSekolah: "",
    namaKetua: "",
    noKetua: "",
    judulInovasi: "",
    linkProposal: "",
    linkYoutube: "",
    kategori: "UI UX",
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
      formData.asalSekolah.trim() !== "" &&
      formData.namaKetua.trim() !== "" &&
      formData.noKetua.trim() !== "" &&
      formData.judulInovasi.trim() !== "" &&
      formData.linkProposal.trim() !== "" &&
      formData.linkYoutube.trim() !== ""
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
        asal_sekolah: formData.asalSekolah,
        nama_ketua: formData.namaKetua,
        no_whatsapp: formData.noKetua,
        judul_inovasi: formData.judulInovasi,
        link_proposal_drive: formData.linkProposal,
        link_youtube: formData.linkYoutube,
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
        message: "Selamat! Karya tim Anda telah berhasil dikumpulkan. Panitia akan segera memproses data Anda.",
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
            Genetic <span className="text-brand-sun">Competition</span>
          </h1>
          <p className="text-white/70 text-sm">
            Silakan lengkapi form pengumpulan karya di bawah ini.
          </p>
        </div>

        <motion.div className="bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Kategori */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                  Kategori Lomba
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["UI UX", "Innovation System Challenge"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, kategori: cat }))}
                      className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-bold ${
                        formData.kategori === cat
                          ? "bg-brand-sun text-brand-midnight border-transparent shadow-lg"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      {formData.kategori === cat && <FiCheckCircle />}
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>

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

              {/* Judul Inovasi */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Judul Inovasi
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiFileText />
                  </span>
                  <input
                    type="text"
                    name="judulInovasi"
                    required
                    value={formData.judulInovasi}
                    onChange={handleChange}
                    placeholder="Masukkan judul inovasi"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Link Proposal */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Link Proposal (Google Drive)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiLink />
                  </span>
                  <input
                    type="url"
                    name="linkProposal"
                    required
                    value={formData.linkProposal}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-brand-sun outline-none transition-all bg-white/10 text-white"
                  />
                </div>
              </motion.div>

              {/* Link Youtube */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                  Link Tautan Youtube
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    <FiYoutube />
                  </span>
                  <input
                    type="url"
                    name="linkYoutube"
                    required
                    value={formData.linkYoutube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
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
