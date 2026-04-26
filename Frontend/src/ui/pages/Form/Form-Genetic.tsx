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
  FiLoader
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import supabase from "../../../lib/api/supabase-client";

type FormData = {
  instansi: string;
  namaTim: string;
  kategori: string;
  namaKetua: string;
  noKetua: string;
  suratKetua: File | null;
  buktiFollowKetua: File | null;
  anggota1: string;
  suratAnggota1: File | null;
  buktiFollowAnggota1: File | null;
  anggota2: string;
  suratAnggota2: File | null;
  buktiFollowAnggota2: File | null;
  anggota3: string;
  suratAnggota3: File | null;
  buktiFollowAnggota3: File | null;
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
      damping: 12
    },
  },
};

export default function FormGenetic() {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("form_genetic_step");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [isShaking, setIsShaking] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      anggota1: "",
      suratAnggota1: null,
      buktiFollowAnggota1: null,
      anggota2: "",
      suratAnggota2: null,
      buktiFollowAnggota2: null,
      anggota3: "",
      suratAnggota3: null,
      buktiFollowAnggota3: null,
      batch: "Batch I",
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

  const totalSteps = 6;

  useEffect(() => {
    const dataToSave = { ...formData };
    const fileFields: (keyof FormData)[] = [
      "suratKetua", 
      "buktiFollowKetua",
      "suratAnggota1", 
      "buktiFollowAnggota1",
      "suratAnggota2", 
      "buktiFollowAnggota2",
      "suratAnggota3", 
      "buktiFollowAnggota3",
      "buktiBayar"
    ];
    
    fileFields.forEach(field => {
      delete (dataToSave as any)[field];
    });

    localStorage.setItem("form_genetic_data", JSON.stringify(dataToSave));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("form_genetic_step", step.toString());
  }, [step]);

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.instansi.trim() !== "" && formData.namaTim.trim() !== "";
      case 2:
        return formData.namaKetua.trim() !== "" && formData.noKetua.trim() !== "" && formData.suratKetua !== null && formData.buktiFollowKetua !== null;
      case 3:
        return formData.anggota1.trim() !== "" && formData.suratAnggota1 !== null && formData.buktiFollowAnggota1 !== null;
      case 4:
        return formData.anggota2.trim() !== "" && formData.suratAnggota2 !== null && formData.buktiFollowAnggota2 !== null;
      case 5:
        return formData.anggota3.trim() !== "" && formData.suratAnggota3 !== null && formData.buktiFollowAnggota3 !== null;
      case 6:
        return formData.buktiBayar !== null;
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
    return fields.some(field => {
      const val = formData[field];
      if (val === null) return true;
      if (typeof val === "string") return val.trim() === "";
      return false;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const steps = [
    { id: 1, label: "Data Tim", icon: <FiUsers /> },
    { id: 2, label: "Ketua Tim", icon: <FiUser /> },
    { id: 3, label: "Anggota 1", icon: <FiUser /> },
    { id: 4, label: "Anggota 2", icon: <FiUser /> },
    { id: 5, label: "Anggota 3", icon: <FiUser /> },
    { id: 6, label: "Pembayaran", icon: <FiCreditCard /> },
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

    setIsSubmitting(true);

    try {
      // 1. Upload semua file secara paralel
      const [
        urlSuratKetua, urlFollowKetua,
        urlSuratA1, urlFollowA1,
        urlSuratA2, urlFollowA2,
        urlSuratA3, urlFollowA3,
        urlBuktiBayar
      ] = await Promise.all([
        uploadFile(formData.suratKetua!, "surat_ketua"),
        uploadFile(formData.buktiFollowKetua!, "follow_ketua"),
        uploadFile(formData.suratAnggota1!, "surat_a1"),
        uploadFile(formData.buktiFollowAnggota1!, "follow_a1"),
        uploadFile(formData.suratAnggota2!, "surat_a2"),
        uploadFile(formData.buktiFollowAnggota2!, "follow_a2"),
        uploadFile(formData.suratAnggota3!, "surat_a3"),
        uploadFile(formData.buktiFollowAnggota3!, "follow_a3"),
        uploadFile(formData.buktiBayar!, "bukti_bayar"),
      ]);

      // 2. Simpan data ke tabel registrations
      const { error } = await supabase.from("registrations").insert({
        instansi: formData.instansi,
        nama_tim: formData.namaTim,
        kategori: formData.kategori,
        batch: formData.batch,
        nama_ketua: formData.namaKetua,
        no_ketua: formData.noKetua,
        surat_ketua_url: urlSuratKetua,
        bukti_follow_ketua_url: urlFollowKetua,
        anggota1_nama: formData.anggota1,
        anggota1_surat_url: urlSuratA1,
        anggota1_follow_url: urlFollowA1,
        anggota2_nama: formData.anggota2,
        anggota2_surat_url: urlSuratA2,
        anggota2_follow_url: urlFollowA2,
        anggota3_nama: formData.anggota3,
        anggota3_surat_url: urlSuratA3,
        anggota3_follow_url: urlFollowA3,
        bukti_bayar_url: urlBuktiBayar,
      });

      if (error) throw error;

      alert("Selamat! Pendaftaran tim '" + formData.namaTim + "' berhasil terkirim. Panitia akan segera melakukan verifikasi.");
      
      localStorage.removeItem("form_genetic_data");
      localStorage.removeItem("form_genetic_step");
      
      // Kembali ke halaman utama
      navigate("/");

    } catch (error: any) {
      console.error("Submission error:", error);
      alert("Gagal melakukan pendaftaran. Silakan cek kembali koneksi internet Anda atau hubungi admin.\n\nDetail Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-3 uppercase tracking-wider">
                Kategori Lomba
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["UI UX", "Innovation System Challenge"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, kategori: cat }))}
                    className={`py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 text-sm font-bold ${
                      formData.kategori === cat 
                      ? "bg-[#e21c70] text-white border-transparent shadow-lg shadow-pink-200" 
                      : "bg-[#e9cfeb]/50 border-pink-200 text-[#191b37] hover:bg-[#e9cfeb]"
                    }`}
                  >
                    {formData.kategori === cat && <FiCheckCircle />}
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Instansi Sekolah SMA/SMK Sederajat 
              </label>
              <input
                type="text"
                name="instansi"
                required
                value={formData.instansi}
                onChange={handleChange}
                placeholder="Contoh: SMA Negeri 1 Semarang"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["instansi"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Tim 
              </label>
              <input
                type="text"
                name="namaTim"
                required
                value={formData.namaTim}
                onChange={handleChange}
                placeholder="Contoh: Bigetron"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["namaTim"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Ketua Tim 
              </label>
              <input
                type="text"
                name="namaKetua"
                required
                value={formData.namaKetua}
                onChange={handleChange}
                placeholder="Nama lengkap ketua"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["namaKetua"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nomor Whatsapp Ketua Tim 
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#191b37]">
                  <FaWhatsapp />
                </span>
                <input
                  type="tel"
                  name="noKetua"
                  required
                  value={formData.noKetua}
                  onChange={handleChange}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 ${
                    isInvalid(["noKetua"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                  }`}
                />
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Surat Keterangan Siswa Aktif Ketua 
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["suratKetua"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="suratKetua"
                    name="suratKetua"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="suratKetua" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["suratKetua"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["suratKetua"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.suratKetua ? formData.suratKetua.name : "Klik untuk upload PDF"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["buktiFollowKetua"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="buktiFollowKetua"
                    name="buktiFollowKetua"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="buktiFollowKetua" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["buktiFollowKetua"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiFollowKetua"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.buktiFollowKetua ? formData.buktiFollowKetua.name : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Anggota Tim - 1 
              </label>
              <input
                type="text"
                name="anggota1"
                required
                value={formData.anggota1}
                onChange={handleChange}
                placeholder="Nama lengkap anggota 1"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["anggota1"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Surat Keterangan Siswa Aktif Anggota 1 
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["suratAnggota1"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="suratAnggota1"
                    name="suratAnggota1"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="suratAnggota1" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["suratAnggota1"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["suratAnggota1"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.suratAnggota1 ? formData.suratAnggota1.name : "Klik untuk upload PDF"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["buktiFollowAnggota1"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="buktiFollowAnggota1"
                    name="buktiFollowAnggota1"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="buktiFollowAnggota1" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["buktiFollowAnggota1"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiFollowAnggota1"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.buktiFollowAnggota1 ? formData.buktiFollowAnggota1.name : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Anggota Tim - 2 
              </label>
              <input
                type="text"
                name="anggota2"
                required
                value={formData.anggota2}
                onChange={handleChange}
                placeholder="Nama lengkap anggota 2"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["anggota2"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Surat Keterangan Siswa Aktif Anggota 2 
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["suratAnggota2"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="suratAnggota2"
                    name="suratAnggota2"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="suratAnggota2" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["suratAnggota2"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["suratAnggota2"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.suratAnggota2 ? formData.suratAnggota2.name : "Klik untuk upload PDF"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["buktiFollowAnggota2"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="buktiFollowAnggota2"
                    name="buktiFollowAnggota2"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="buktiFollowAnggota2" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["buktiFollowAnggota2"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiFollowAnggota2"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.buktiFollowAnggota2 ? formData.buktiFollowAnggota2.name : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider">
                Nama Anggota Tim - 3 
              </label>
              <input
                type="text"
                name="anggota3"
                required
                value={formData.anggota3}
                onChange={handleChange}
                placeholder="Nama lengkap anggota 3"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#e21c70] focus:border-transparent outline-none transition-all bg-[#e9cfeb]/50 backdrop-blur-sm ${
                  isInvalid(["anggota3"]) ? "border-red-500 ring-2 ring-red-100" : "border-pink-400"
                }`}
              />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Surat Keterangan Siswa Aktif Anggota 3 
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["suratAnggota3"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="suratAnggota3"
                    name="suratAnggota3"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="suratAnggota3" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["suratAnggota3"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["suratAnggota3"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.suratAnggota3 ? formData.suratAnggota3.name : "Klik untuk upload PDF"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col">
                <label className="block text-sm font-semibold text-[#191b37] mb-1 uppercase tracking-wider md:min-h-12">
                  Bukti Follow IG @digifest.usm
                </label>
                <div className={`grow border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                  isInvalid(["buktiFollowAnggota3"]) 
                  ? "border-red-500 bg-red-50/30" 
                  : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
                }`}>
                  <input
                    type="file"
                    id="buktiFollowAnggota3"
                    name="buktiFollowAnggota3"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="buktiFollowAnggota3" className="cursor-pointer h-full flex flex-col items-center justify-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                      isInvalid(["buktiFollowAnggota3"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                    }`}>
                      <FiUploadCloud size={24} />
                    </div>
                    <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiFollowAnggota3"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                      {formData.buktiFollowAnggota3 ? formData.buktiFollowAnggota3.name : "Klik untuk upload Gambar"}
                    </p>
                    <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                  </label>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-linear-to-br from-pink-50 to-white border border-pink-200 shadow-sm">
              <h4 className="text-xs font-bold text-[#e21c70] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <FiCreditCard /> Rekening Pembayaran
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-pink-50 pb-2">
                  <span className="text-xs text-[#191b37] font-medium">Metode</span>
                  <span className="text-sm font-bold text-[#191b37]">DANA</span>
                </div>
                <div className="flex justify-between items-center border-b border-pink-50 pb-2">
                  <span className="text-xs text-[#191b37] font-medium">Nomor</span>
                  <span className="text-sm font-bold text-[#191b37]">087827934564</span>
                </div>
                <div className="flex justify-between items-center border-b border-pink-50 pb-2">
                  <span className="text-xs text-[#191b37] font-medium">Atas Nama</span>
                  <span className="text-sm font-bold text-[#191b37]">Fadilla Rahmadani Safira</span>
                </div>
                <div className="flex justify-between items-center border-b border-pink-50 pb-2">
                  <span className="text-xs text-[#191b37] font-medium">Early Bird (Batch I)</span>
                  <span className="text-sm font-bold text-[#e21c70]">Rp. 50.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#191b37] font-medium">Normal Price (Batch II)</span>
                  <span className="text-sm font-bold text-[#191b37]">Rp. 60.000</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-3 uppercase tracking-wider">
                Pendaftaran Batch 
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Batch I", "Batch II"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, batch: b }))}
                    className={`py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                      formData.batch === b 
                      ? "bg-[#e21c70] text-white border-transparent shadow-lg shadow-pink-200" 
                      : "bg-[#e9cfeb]/50 border-pink-400 text-[#191b37] hover:bg-[#e9cfeb]"
                    }`}
                  >
                    {formData.batch === b && <FiCheckCircle />}
                    {b}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-[#191b37] mb-3 uppercase tracking-wider">
                Bukti Pembayaran Biaya Pendaftaran 
              </label>
              <div className={`border-2 border-dashed rounded-2xl p-6 text-center backdrop-blur-sm transition-all group ${
                isInvalid(["buktiBayar"]) 
                ? "border-red-500 bg-red-50/30" 
                : "border-pink-400 bg-[#e9cfeb]/30 hover:bg-[#e9cfeb]/50"
              }`}>
                <input
                  type="file"
                  id="bukti"
                  name="buktiBayar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="bukti" className="cursor-pointer flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${
                    isInvalid(["buktiBayar"]) ? "bg-red-100 text-red-500" : "bg-pink-100 text-[#e21c70]"
                  }`}>
                    <FiCreditCard size={24} />
                  </div>
                  <p className={`text-sm mb-1 truncate w-full px-2 ${isInvalid(["buktiBayar"]) ? "text-red-600 font-semibold" : "text-[#191b37]"}`}>
                    {formData.buktiBayar ? formData.buktiBayar.name : "Klik untuk upload bukti (Gambar)"}
                  </p>
                  <p className="text-xs text-[#191b37]/50">Maks 10MB</p>
                </label>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-[#e9cfeb] bg-[radial-gradient(#e21c7011_1px,transparent_1px)] bg-size-[20px_20px] overflow-x-hidden">
      {/* Decorative Circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl"
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
            <div className="h-px bg-linear-to-r from-transparent to-[#e21c70] grow max-w-25"></div>
            <h2 className="px-4 text-xs sm:text-sm font-bold text-[#e21c70] uppercase tracking-[0.3em]">
              Pendaftaran Tim
            </h2>
            <div className="h-px bg-linear-to-l from-transparent to-[#e21c70] grow max-w-25"></div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#191b37] font-montserrat tracking-tight mb-4">
            Form Pendaftaran <span className="text-[#e21c70]">Tim</span>
          </h1>
          <p className="text-[#191b37] text-sm max-w-lg mx-auto leading-relaxed">
            Simpan dan lengkapi data tim anda kapan pun anda siap. Tampilan form telah disesuaikan agar tetap praktis, baik di layar dekstop maupun mobile.
          </p>
        </div>

        {/* Progress Container */}
        <div className="bg-[#e9cfeb]/80 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white shadow-2xl shadow-pink-100/50">
          <div className="flex justify-between items-center mb-6 px-2">
            <span className="text-xs font-bold text-[#e21c70] uppercase tracking-widest">Progress Step</span>
            <span className="text-sm font-bold text-[#191b37]/50">{step}/{totalSteps}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-pink-50 rounded-full mb-8 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-linear-to-r from-pink-400 to-[#e21c70]"
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
                  ? "bg-[#e21c70] text-white ring-4 ring-pink-100 shadow-lg shadow-pink-200" 
                  : "bg-[#e9cfeb]/30 text-[#191b37]/30"
                }`}>
                  {s.icon}
                </motion.div>
                <span className={`text-[10px] font-bold uppercase hidden sm:block ${
                  step >= s.id ? "text-[#e21c70]" : "text-[#191b37]/30"
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
            {/* Background Line for steps */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-[#e9cfeb] z-0"></div>
          </div>
        </div>

        {/* Form Card */}
        <motion.div 
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-[#e9cfeb]/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-2xl shadow-pink-100/50 min-h-100 flex flex-col relative"
        >
          <AnimatePresence>
            {showErrors && !validateStep() && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="absolute top-4 right-8 text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100 flex items-center gap-1 z-20"
              >
                <span>⚠️ LENGKAPI DATA</span>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="text-xl font-bold text-[#191b37] mb-8 flex items-center gap-3">
            <motion.span 
              key={step}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 h-8 rounded-lg bg-pink-100 text-[#e21c70] flex items-center justify-center text-sm"
            >
              {step}
            </motion.span>
            {steps.find(s => s.id === step)?.label}
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
                : "bg-[#e9cfeb]/50 text-[#191b37] hover:bg-[#e9cfeb]"
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
                  : "bg-[#e21c70] text-white shadow-pink-200 hover:bg-[#c0175e]"
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
                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold hover:shadow-xl transition-all ${
                  isSubmitting ? "bg-pink-400 cursor-not-allowed" : 
                  (showErrors && !validateStep()
                  ? "bg-red-600 shadow-red-200"
                  : "bg-[#e21c70]")
                }`}
              >
                {isSubmitting ? (
                  <>Memproses... <FiLoader className="animate-spin" /></>
                ) : (
                  <>Submit Pendaftaran <FiCheckCircle /></>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[#191b37]/50 text-xs mt-8"
        >
          Draft isian tersimpan otomatis saat kamu isi form. Jika halaman refresh, data teks akan dipulihkan, namun file yang diunggah harus dimasukkan ulang.
        </motion.p>
      </motion.div>
    </div>
  );
}