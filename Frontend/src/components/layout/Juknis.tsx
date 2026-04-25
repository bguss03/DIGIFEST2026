import { LuBookOpenText } from 'react-icons/lu';
import { motion } from 'motion/react';

export default function Juknis() {
    const handleToDrive = () => {
    window.open("https://drive.google.com/drive/folders/1qkhQnLSbUc1uacleEwLxcBFg164NI2Wi?usp=sharing", "_blank", "noopener,noreferrer");
  };
  return (
    // 1. Container Latar Belakang Melayang (Z-Index 50 agar paling atas)
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="fixed flex items-center justify-center bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 hover:cursor-pointer" 
      onClick={handleToDrive}
    >
      <div className="absolute right-0 -mr-4 h-15 sm:h-20 w-15 sm:w-20 flex items-center justify-center bg-white rounded-full shadow-lg overflow-hidden ">
        <LuBookOpenText size={45} className="text-[#e21c70] p-1" />
      </div>

      <button
        className="flex items-center h-10 sm:h-16 bg-linear-to-r from-[#cc3399] via-[#cc3399] to-[#6666cc] hover:cursor-pointer text-white rounded-full shadow-lg pr-15 sm:pe-20 pl-8"
        aria-label="Buka Juknis"
      >
        <span className="text-sm sm:text-lg font-bold font-montserrat whitespace-nowrap ">
          Juklak Juknis
        </span>
      </button>

    </motion.div>
  );
}