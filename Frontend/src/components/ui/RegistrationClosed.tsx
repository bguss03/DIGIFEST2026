import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FiXCircle, FiArrowLeft } from "react-icons/fi";

export default function RegistrationClosed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-transparent overflow-x-hidden flex items-center justify-center">
      {/* Decorative Circles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-brand-sun/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto relative z-10 w-full"
      >
        <div className="bg-brand-midnight/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl shadow-red-500/5 text-center">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
            className="mx-auto mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(239, 68, 68, 0.2)",
                    "0 0 0 20px rgba(239, 68, 68, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full"
              />
              <FiXCircle className="text-red-500 text-5xl" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center w-full mb-4">
              <div className="h-px bg-linear-to-r from-transparent to-red-500/50 grow max-w-16"></div>
              <span className="px-3 text-xs font-bold text-red-400 uppercase tracking-[0.3em]">
                Pengumuman
              </span>
              <div className="h-px bg-linear-to-l from-transparent to-red-500/50 grow max-w-16"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-montserrat tracking-tight mb-4">
              Pendaftaran Sudah{" "}
              <span className="text-red-500">Ditutup</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white/60 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8"
          >
            Mohon maaf, periode pendaftaran untuk kompetisi ini telah berakhir.
            Terima kasih atas antusiasme Anda. Nantikan event-event selanjutnya
            dari Digifest!
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-8"
          />

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-sun text-brand-midnight font-bold rounded-xl shadow-lg shadow-brand-sun/20 hover:bg-brand-sun/90 transition-all"
          >
            <FiArrowLeft />
            Kembali ke Beranda
          </motion.button>
        </div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-white/30 text-xs mt-6"
        >
          Jika ada pertanyaan, silakan hubungi panitia melalui kontak yang
          tersedia.
        </motion.p>
      </motion.div>
    </div>
  );
}
