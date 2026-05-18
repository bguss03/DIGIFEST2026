import { motion, AnimatePresence } from "motion/react";
import { FiCheckCircle, FiXCircle, FiAlertTriangle } from "react-icons/fi";

type StatusModalProps = {
  isOpen: boolean;
  status: "success" | "error" | "warning" | null;
  title: string;
  message: React.ReactNode; 
  onClose: () => void;
  onAction?: () => void;
};

export default function StatusModal({
  isOpen,
  status,
  title,
  message,
  onClose,
  onAction,
}: StatusModalProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: <FiCheckCircle className="text-green-500" size={32} />,
          bgColor: "bg-green-50/10",
          accentColor: "bg-brand-sun",
          hoverColor: "hover:bg-brand-sun/80",
        };
      case "warning":
        return {
          icon: <FiAlertTriangle className="text-yellow-500" size={32} />,
          bgColor: "bg-yellow-50/10",
          accentColor: "bg-brand-midnight",
          hoverColor: "hover:bg-brand-midnight/80",
        };
      case "error":
      default:
        return {
          icon: <FiXCircle className="text-red-500" size={32} />,
          bgColor: "bg-red-50/10",
          accentColor: "bg-brand-midnight",
          hoverColor: "hover:bg-brand-midnight/80",
        };
    }
  };

  const config = getStatusConfig();

  const handleOkClick = () => {
    if (onAction) {
      onAction(); 
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#191b37]/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-100 overflow-hidden"
          >
            <div className="p-8 flex flex-col items-center text-center">
              {/* Icon */}
              <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mb-6 ring-8 ring-white/50`}>
                {config.icon}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-[#191b37] mb-2 font-montserrat tracking-tight">
                {title}
              </h2>

              {/* Message */}
              <div className="text-gray-600 text-sm leading-relaxed mb-8">
                {message}
              </div>

              {/* Action Button - Hanya OK */}
              <div className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOkClick}
                  className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all ${config.accentColor} ${config.hoverColor} text-white shadow-lg shadow-pink-100`}
                >
                  <span>OK</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}