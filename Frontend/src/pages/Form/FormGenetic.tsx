import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUser,
  FiCreditCard,
  FiChevronRight,
  FiChevronLeft,
  FiUploadCloud,
  FiCheckCircle,
  FiLoader,
  FiDownload,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { Turnstile } from "@marsidev/react-turnstile";
import supabase from "@/lib/api/supabase-client";
import StatusModal from "@/components/ui/StatusModal";

type FormData = {
  instansi: string;
  namaTim: string;
  kategori: string;
  namaKetua: string;
  noKetua: string;
  suratKetua: File | null;
  buktiFollowKetua: File | null;
  buktiPostKetua: File | null;
  anggota1: string;
  suratAnggota1: File | null;
  buktiFollowAnggota1: File | null;
  buktiPostA1: File | null;
  anggota2: string;
  suratAnggota2: File | null;
  buktiFollowAnggota2: File | null;
  buktiPostA2: File | null;
  anggota3: string;
  suratAnggota3: File | null;
  buktiFollowAnggota3: File | null;
  buktiPostA3: File | null;
  batch: string;
  buktiBayar: File | null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const GROUP_LINKS: Record<string, string> = {
  "UI UX": "https://chat.whatsapp.com/CCj4QfDDQRiEpMOOlmRiPt",
  "Innovation System Challenge":
    "https://chat.whatsapp.com/EImhllNLHtwBWasLwrE0Zm",
};

export default function FormGenetic() {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("form_genetic_step");
    const parsedStep = savedStep ? parseInt(savedStep, 10) : 1;
    return parsedStep > 5 ? 5 : parsedStep;
  });
  const [isShaking, setIsShaking] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const earlyBirdDeadline = new Date("2026-06-08T23:59:59");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isEarlyBirdActive = currentDate <= earlyBirdDeadline;
  const isNormalPriceActive = currentDate > earlyBirdDeadline;

  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    status: "success" | "error" | "warning" | null;
    title: string;
    message: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    hideCloseButton?: boolean;
  }>({
    isOpen: false,
    status: null,
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem("form_genetic_data");
    const defaultData = {
      instansi: "",
      namaTim: "",
      kategori: "UI UX",
      namaKetua: "",
      noKetua: "",
      suratKetua: null,
      buktiFollowKetua: null,
      buktiPostKetua: null,
      anggota1: "",
      suratAnggota1: null,
      buktiFollowAnggota1: null,
      buktiPostA1: null,
      anggota2: "",
      suratAnggota2: null,
      buktiFollowAnggota2: null,
      buktiPostA2: null,
      anggota3: "",
      suratAnggota3: null,
      buktiFollowAnggota3: null,
      buktiPostA3: null,
      batch: isEarlyBirdActive ? "Early Bird" : "Normal Price",
      buktiBayar: null,
    };

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        return { ...defaultData, ...parsedData };
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return defaultData;
      }
    }
    return defaultData;
  });

  const totalSteps = 5;

  useEffect(() => {
    const dataToSave = { ...formData };
    const fileFields: (keyof FormData)[] = [
      "suratKetua",
      "buktiFollowKetua",
      "buktiPostKetua",
      "suratAnggota1",
      "buktiFollowAnggota1",
      "buktiPostA1",
      "suratAnggota2",
      "buktiFollowAnggota2",
      "buktiPostA2",
      "suratAnggota3",
      "buktiFollowAnggota3",
      "buktiPostA3",
      "buktiBayar",
    ];

    fileFields.forEach((field) => {
      delete (dataToSave as Partial<FormData>)[field];
    });

    localStorage.setItem("form_genetic_data", JSON.stringify(dataToSave));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("form_genetic_step", step.toString());
  }, [step]);

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          formData.instansi.trim() !== "" && formData.namaTim.trim() !== ""
        );
      case 2:
        return (
          formData.namaKetua.trim() !== "" &&
          formData.noKetua.trim() !== "" &&
          formData.suratKetua !== null &&
          formData.buktiFollowKetua !== null &&
          formData.buktiPostKetua !== null
        );
      case 3:
        return (
          formData.anggota1.trim() !== "" &&
          formData.suratAnggota1 !== null &&
          formData.buktiFollowAnggota1 !== null &&
          formData.buktiPostA1 !== null
        );
      case 4:
        return (
          formData.anggota2.trim() !== "" &&
          formData.suratAnggota2 !== null &&
          formData.buktiFollowAnggota2 !== null &&
          formData.buktiPostA2 !== null
        );
      case 5:
        return formData.buktiBayar !== null && turnstileToken !== null;
      default:
        return true;
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setShowErrors(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, totalSteps));
      setShowErrors(false);
    } else {
      triggerShake();
    }
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
    setShowErrors(false);
  };

  const isInvalid = (fields: (keyof FormData)[]) => {
    if (!showErrors) return false;
    return fields.some((field) => {
      const val = formData[field];
      if (val === null) return true;
      if (typeof val === "string") return val.trim() === "";
      return false;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (file.size > maxSize) {
        setStatusModal({
          isOpen: true,
          status: "warning",
          title: "File Terlalu Besar",
          message: `Ukuran file "${file.name}" melebihi batas maksimal 10MB. Mohon unggah file yang lebih kecil.`,
          onAction: () => setStatusModal((prev) => ({ ...prev, isOpen: false })),
        });
        e.target.value = "";
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    }
  };

  const steps = [
    { id: 1, label: "Data Tim", icon: <FiUsers /> },
    { id: 2, label: "Ketua Tim", icon: <FiUser /> },
    { id: 3, label: "Anggota 1", icon: <FiUser /> },
    { id: 4, label: "Anggota 2", icon: <FiUser /> },
    { id: 5, label: "Pembayaran", icon: <FiCreditCard /> },
  ];

  const uploadFile = async (file: File, folder: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("pendaftaran-digifest")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("pendaftaran-digifest")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      triggerShake();
      return;
    }

    if (!turnstileToken) {
      setStatusModal({
        isOpen: true,
        status: "warning",
        title: "Verifikasi Diperlukan",
        message:
          "Mohon centang kotak verifikasi keamanan (Turnstile) terlebih dahulu.",
        onAction: () => setStatusModal((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload semua file secara paralel
      const [
        urlSuratKetua,
        urlFollowKetua,
        urlPostKetua,
        urlSuratA1,
        urlFollowA1,
        urlPostA1,
        urlSuratA2,
        urlFollowA2,
        urlPostA2,
        urlBuktiBayar,
      ] = await Promise.all([
        uploadFile(formData.suratKetua!, "surat_ketua"),
        uploadFile(formData.buktiFollowKetua!, "follow_ketua"),
        uploadFile(formData.buktiPostKetua!, "post_ketua"),
        uploadFile(formData.suratAnggota1!, "surat_a1"),
        uploadFile(formData.buktiFollowAnggota1!, "follow_a1"),
        uploadFile(formData.buktiPostA1!, "post_a1"),
        uploadFile(formData.suratAnggota2!, "surat_a2"),
        uploadFile(formData.buktiFollowAnggota2!, "follow_a2"),
        uploadFile(formData.buktiPostA2!, "post_a2"),
        uploadFile(formData.buktiBayar!, "bukti_bayar"),
      ]);

      // 2. Mapping data untuk database payload
      const dbPayload = {
        instansi: formData.instansi,
        nama_tim: formData.namaTim,
        kategori: formData.kategori,
        batch: formData.batch,
        nama_ketua: formData.namaKetua,
        no_ketua: formData.noKetua,
        surat_ketua_url: urlSuratKetua,
        bukti_follow_ketua_url: urlFollowKetua,
        bukti_post_ketua_url: urlPostKetua,
        anggota1_nama: formData.anggota1,
        anggota1_surat_url: urlSuratA1,
        anggota1_follow_url: urlFollowA1,
        anggota1_post_url: urlPostA1,
        anggota2_nama: formData.anggota2,
        anggota2_surat_url: urlSuratA2,
        anggota2_follow_url: urlFollowA2,
        anggota2_post_url: urlPostA2,
        bukti_bayar_url: urlBuktiBayar,
      };

      // 3. Panggil Edge Function untuk validasi Turnstile & bypass RLS
      const { data, error: functionError } = await supabase.functions.invoke(
        "submit-registrasi",
        {
          body: {
            formData: dbPayload,
            turnstileToken,
          },
        },
      );

      // Pengecekan 1: Jika fungsi gagal dieksekusi (Network error, dll)
      if (functionError) {
        throw new Error(functionError.message);
      }

      // Pengecekan 2: Jika fungsi berhasil, tapi ada error dari validasi Deno (misal Turnstile gagal)
      if (data && data.error) {
        throw new Error(data.error);
      }

      const groupLink =
        GROUP_LINKS[formData.kategori] || "https://chat.whatsapp.com/";

      setStatusModal({
        isOpen: true,
        status: "success",
        title: "Pendaftaran Berhasil!",
        message: (
          <div className="space-y-4">
            <p>
              Selamat! Pendaftaran tim{" "}
              <span className="text-brand-sun font-bold">
                {formData.namaTim}
              </span>{" "}
              berhasil terkirim. Panitia akan segera melakukan verifikasi.
            </p>
            {/* Container Grup WhatsApp */}
            <div className="w-full bg-green-50/10 border border-green-500/20 rounded-2xl p-4 mb-6 backdrop-blur-sm">
              {/* Label Peringatan */}
              <p className="text-[10px] sm:text-xs font-bold text-green-400 text-center uppercase tracking-wider mb-3">
                Wajib Bergabung ke Grup WhatsApp
              </p>

              {/* Tombol WhatsApp */}
              <a
                href={groupLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Gabung Grup WhatsApp ${formData.kategori}`}
                className="flex items-center justify-center gap-2 w-full py-5 px-4 bg-[#25D366] text-white font-bold rounded-xl shadow-md shadow-green-200/60 hover:bg-[#128C7E] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all duration-200 ease-in-out"
              >
                <FaWhatsapp className="text-xl" />
                <span className="truncate">
                  Gabung Grup {formData.kategori}
                </span>
              </a>
            </div>
          </div>
        ),
        onAction: () => navigate("/"),
      });

      localStorage.removeItem("form_genetic_data");
      localStorage.removeItem("form_genetic_step");
    } catch (error: unknown) {
      console.error("Submission error:", error);
      const message = error instanceof Error ? error.message : String(error);
      setStatusModal({
        isOpen: true,
        status: "error",
        title: "Pendaftaran Gagal",
        message: `Gagal melakukan pendaftaran. ${message}`,
        onAction: () => setStatusModal((prev) => ({ ...prev, isOpen: false })),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Kategori Lomba
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["UI UX", "Innovation System Challenge"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, kategori: cat }))
                    }
                    className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-bold ${
                      formData.kategori === cat
                        ? "bg-brand-sun text-brand-midnight border-transparent shadow-lg shadow-brand-sun/20"
                        : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    {formData.kategori === cat && <FiCheckCircle />}
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nama Instansi Sekolah SMA/SMK Sederajat
              </label>
              <input
                type="text"
                name="instansi"
                required
                value={formData.instansi}
                onChange={handleChange}
                placeholder="Contoh: SMA Negeri 1 Semarang"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 backdrop-blur-sm text-white ${
                  isInvalid(["instansi"])
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-white/10"
                }`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nama Tim
              </label>
              <input
                type="text"
                name="namaTim"
                required
                value={formData.namaTim}
                onChange={handleChange}
                placeholder="Contoh: Bigetron"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 backdrop-blur-sm text-white ${
                  isInvalid(["namaTim"])
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-white/10"
                }`}
              />
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nama Ketua Tim
              </label>
              <input
                type="text"
                name="namaKetua"
                required
                value={formData.namaKetua}
                onChange={handleChange}
                placeholder="Nama lengkap ketua"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 backdrop-blur-sm text-white ${
                  isInvalid(["namaKetua"])
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-white/10"
                }`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nomor Whatsapp Ketua Tim
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sun">
                  <FaWhatsapp />
                </span>
                <input
                  type="tel"
                  name="noKetua"
                  required
                  value={formData.noKetua}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 text-white ${
                    isInvalid(["noKetua"])
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : "border-white/10"
                  }`}
                />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Foto/Scan Kartu Pelajar (Ketua)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["suratKetua"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="suratKetua"
                    name="suratKetua"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="suratKetua"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ${
                        isInvalid(["suratKetua"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["suratKetua"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.suratKetua
                        ? formData.suratKetua.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm (Ketua)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiFollowKetua"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiFollowKetua"
                    name="buktiFollowKetua"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiFollowKetua"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiFollowKetua"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiFollowKetua"]) ? "text-red-600 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiFollowKetua
                        ? formData.buktiFollowKetua.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Post Poster di Story (Ketua)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiPostKetua"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiPostKetua"
                    name="buktiPostKetua"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiPostKetua"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiPostKetua"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiPostKetua"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiPostKetua
                        ? formData.buktiPostKetua.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nama Anggota Tim - 1
              </label>
              <input
                type="text"
                name="anggota1"
                required
                value={formData.anggota1}
                onChange={handleChange}
                placeholder="Nama lengkap anggota 1"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 backdrop-blur-sm text-white ${
                  isInvalid(["anggota1"])
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-white/10"
                }`}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Foto/Scan Kartu Pelajar (Anggota 1)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["suratAnggota1"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="suratAnggota1"
                    name="suratAnggota1"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="suratAnggota1"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["suratAnggota1"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["suratAnggota1"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.suratAnggota1
                        ? formData.suratAnggota1.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm (Anggota 1)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiFollowAnggota1"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiFollowAnggota1"
                    name="buktiFollowAnggota1"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiFollowAnggota1"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiFollowAnggota1"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiFollowAnggota1"]) ? "text-red-600 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiFollowAnggota1
                        ? formData.buktiFollowAnggota1.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Post Poster di Story (Anggota 1)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiPostA1"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiPostA1"
                    name="buktiPostA1"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiPostA1"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiPostA1"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiPostA1"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiPostA1
                        ? formData.buktiPostA1.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-1 uppercase tracking-wider">
                Nama Anggota Tim - 2
              </label>
              <input
                type="text"
                name="anggota2"
                required
                value={formData.anggota2}
                onChange={handleChange}
                placeholder="Nama lengkap anggota 2"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-sun focus:border-transparent outline-none transition-all bg-white/5 backdrop-blur-sm text-white ${
                  isInvalid(["anggota2"])
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-white/10"
                }`}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Foto/Scan Kartu Pelajar (Anggota 2)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["suratAnggota2"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="suratAnggota2"
                    name="suratAnggota2"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="suratAnggota2"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["suratAnggota2"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["suratAnggota2"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.suratAnggota2
                        ? formData.suratAnggota2.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm (Anggota 2)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiFollowAnggota2"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiFollowAnggota2"
                    name="buktiFollowAnggota2"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiFollowAnggota2"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiFollowAnggota2"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiFollowAnggota2"]) ? "text-red-600 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiFollowAnggota2
                        ? formData.buktiFollowAnggota2.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-[10px] font-semibold text-white mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Post Poster di Story (Anggota 2)
                </label>
                <div
                  className={`grow border-2 border-dashed rounded-2xl p-4 text-center backdrop-blur-sm transition-all group ${
                    isInvalid(["buktiPostA2"])
                      ? "border-red-500 bg-red-500/10"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="file"
                    id="buktiPostA2"
                    name="buktiPostA2"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="buktiPostA2"
                    className="cursor-pointer h-full flex flex-col items-center justify-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                        isInvalid(["buktiPostA2"])
                          ? "bg-red-500/20 text-red-500"
                          : "bg-brand-sun/10 text-brand-sun"
                      }`}
                    >
                      <FiUploadCloud size={20} />
                    </div>
                    <p
                      className={`text-[10px] mb-1 truncate w-full px-1 ${isInvalid(["buktiPostA2"]) ? "text-red-500 font-semibold" : "text-white"}`}
                    >
                      {formData.buktiPostA2
                        ? formData.buktiPostA2.name
                        : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-[8px] text-white/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-sm backdrop-blur-md"
            >
              <h4 className="text-xs font-bold text-brand-sun uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <FiCreditCard /> Rekening Pembayaran
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-white/70 font-medium">
                    Metode
                  </span>
                  <span className="text-sm font-bold text-white">
                    Sea Bank
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-white/70 font-medium">
                    Nomor
                  </span>
                  <span className="text-sm font-bold text-white">
                    901692349640
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-white/70 font-medium">
                    Atas Nama
                  </span>
                  <span className="text-sm font-bold text-white">
                    Ferdy
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs text-white/70 font-medium">
                    Early Bird
                  </span>
                  <span className="text-sm font-bold text-brand-sun">
                    Rp. 50.000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/70 font-medium">
                    Normal Price
                  </span>
                  <span className="text-sm font-bold text-white">
                    Rp. 60.000
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Pendaftaran
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Early Bird", "Normal Price"].map((b) => {
                  const isDisabled =
                    b === "Early Bird"
                      ? !isEarlyBirdActive
                      : !isNormalPriceActive;
                  return (
                    <button
                      key={b}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setFormData((p) => ({ ...p, batch: b }))}
                      className={`py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                        formData.batch === b
                          ? "bg-brand-sun text-brand-midnight border-transparent shadow-lg shadow-brand-sun/20"
                          : isDisabled
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {formData.batch === b && <FiCheckCircle />}
                      {b}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                Bukti Pembayaran Biaya Pendaftaran
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["buktiBayar"])
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <input
                  type="file"
                  id="bukti"
                  name="buktiBayar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="bukti"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["buktiBayar"])
                        ? "bg-red-500/20 text-red-500"
                        : "bg-brand-sun/10 text-brand-sun"
                    }`}
                  >
                    <FiCreditCard size={24} />
                  </div>
                  <p
                    className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiBayar"]) ? "text-red-600 font-semibold" : "text-white"}`}
                  >
                    {formData.buktiBayar
                      ? formData.buktiBayar.name
                      : "Klik untuk upload bukti (Gambar)"}
                  </p>
                  <p className="text-xs text-white/50">Maks 10MB</p>
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 pt-4">
              <label className="block text-[10px] font-bold text-brand-sun uppercase tracking-[0.2em] text-center">
                Verifikasi Keamanan
              </label>
              <div className="flex justify-center p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-inner scale-90 sm:scale-100">
                <Turnstile
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                  options={{
                    theme: "dark",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-transparent overflow-x-hidden">
      {/* Decorative Circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-brand-sun/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-brand-sky/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center w-full mb-6">
            <div className="h-px bg-linear-to-r from-transparent to-brand-sun grow max-w-25"></div>
            <h2 className="px-4 text-xs sm:text-sm font-bold text-brand-sun uppercase tracking-[0.3em]">
              Pendaftaran Tim
            </h2>
            <div className="h-px bg-linear-to-l from-transparent to-brand-sun grow max-w-25"></div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-montserrat tracking-tight mb-4">
            Form Pendaftaran <span className="text-brand-sun">Tim</span>
          </h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed">
            Lengkapi data satu tim secara bertahap.
          </p>
        </div>

        {/* Progress Container */}
        <div className="bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10 shadow-2xl shadow-brand-sun/5">
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-xs font-bold text-brand-sun uppercase tracking-widest">
              Progress Step
            </span>
            <span className="text-sm font-bold text-white/50">
              {step}/{totalSteps}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full mb-8 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-linear-to-r from-brand-sun to-brand-sand"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Step Icons */}
          <div className="flex justify-between relative">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 z-10">
                <motion.div
                  animate={step >= s.id ? { scale: [1, 1.2, 1] } : {}}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    step >= s.id
                      ? "bg-brand-sun text-brand-midnight ring-4 ring-brand-sun/10 shadow-lg shadow-brand-sun/20"
                      : "bg-white/5 text-white/30"
                  }`}
                >
                  {s.icon}
                </motion.div>
                <span
                  className={`text-[10px] font-bold uppercase hidden sm:block ${
                    step >= s.id ? "text-brand-sun" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-brand-sun/5 min-h-100 flex flex-col relative"
        >
          <AnimatePresence>
            {showErrors && !validateStep() && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute top-4 right-8 text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1 z-20"
              >
                <span>⚠️ LENGKAPI DATA</span>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <motion.span
              key={step}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-8 rounded-lg bg-brand-sun/10 text-brand-sun flex items-center justify-center text-sm"
            >
              {step}
            </motion.span>
            {steps.find((s) => s.id === step)?.label}
          </h3>

          <div className="grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 gap-4">
            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={step === 1 || isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                step === 1
                  ? "opacity-0 pointer-events-none"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FiChevronLeft /> Kembali
            </motion.button>

            {step < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${
                  showErrors && !validateStep()
                    ? "bg-red-500 text-white shadow-red-200"
                    : "bg-brand-sun text-brand-midnight shadow-brand-sun/20 hover:bg-brand-sun/80"
                }`}
              >
                Lanjut <FiChevronRight />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-4 py-4 sm:px-8 sm:py-3 rounded-xl text-brand-midnight font-bold hover:shadow-xl transition-all ${
                  isSubmitting
                    ? "bg-brand-sun/50 cursor-not-allowed"
                    : showErrors && !validateStep()
                      ? "bg-red-600 text-white shadow-red-200"
                      : "bg-brand-sun"
                }`}
              >
                {isSubmitting ? (
                  <>
                    Memproses... <FiLoader className="animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Pendaftaran <FiCheckCircle />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Bahan Repost Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FiUploadCloud className="text-brand-sun" /> Bahan Repost Poster
          </h3>
          <p className="text-white/70 text-sm mb-6">
            Silakan unduh poster di bawah ini dan posting di Instagram Story Anda, lalu unggah bukti screenshot-nya pada form di atas.
          </p>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2">
            <img 
              src="/poster.jpeg" 
              alt="Poster Digifest" 
              className="w-full h-auto rounded-xl max-h-120 object-contain bg-white/5"
            />
          </div>
          <a 
            href="/poster.jpeg" 
            download="Poster-Digifest.jpeg"
            className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-brand-sun text-brand-midnight font-bold rounded-xl hover:bg-brand-sun/80 transition-all"
          >
            <FiDownload /> Download Poster
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/40 text-xs mt-8"
        >
          Draft isian tersimpan otomatis saat kamu isi form. Jika halaman
          refresh, data teks akan dipulihkan, namun file yang diunggah harus
          dimasukkan ulang.
        </motion.p>
      </motion.div>

      <StatusModal
        isOpen={statusModal.isOpen}
        status={statusModal.status}
        title={statusModal.title}
        message={statusModal.message}
        onAction={statusModal.onAction}
        onClose={() => setStatusModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
