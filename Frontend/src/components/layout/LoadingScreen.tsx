import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#191b37]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="flex flex-col items-center"
          >
            <img
              src="/digifest-logo1.svg"
              alt="Digifest Logo"
              className="h-32 w-32 mb-4"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-[#e21c70] rounded-full w-48 overflow-hidden"
            >
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-full w-full bg-[#fdf2f8] opacity-50"
              />
            </motion.div>
            <p className="mt-4 text-[#fdf2f8] font-mono text-sm tracking-widest uppercase">
              Loading Digital Innovation...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
