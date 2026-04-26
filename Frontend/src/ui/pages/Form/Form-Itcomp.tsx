import { Link } from "react-router-dom";
import { motion } from "motion/react";
import '.../../../Frontend/src/index.css';

export default function FormItcomp() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="grow flex flex-col items-center justify-center bg-[#e9cfeb] bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px] px-6 text-center font-montserrat pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <h1 className="text-6xl sm:text-9xl font-black italic mb-2 tracking-tighter text-[#191b37] drop-shadow-[0_0_15px_rgba(226,28,112,0.3)]">
                            COMING SOON
                        </h1>
                    </motion.div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm sm:text-base max-w-md mb-10 text-[#191b37] opacity-80 leading-relaxed font-medium"
                    >
                        Mohon maaf, halaman yang Anda tuju sedang dalam proses pengembangan.
                    </motion.p>
                    
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            to="/"
                            className="bg-[#191b37] text-[#e9cfeb] px-10 py-4 rounded-full font-bold text-sm sm:text-base shadow-[0_10px_20px_rgba(25,27,55,0.2)] hover:shadow-[0_15px_30px_rgba(25,27,55,0.3)] transition-all duration-300"
                        >
                            KEMBALI KE BERANDA
                        </Link>
                    </motion.div>
                </motion.div>
                
                {/* Floating Elements for visual interest */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <motion.div 
                        animate={{ 
                            y: [0, -20, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[20%] left-[10%] w-12 h-12 border-4 border-[#e21c70]/20 rounded-lg hidden md:block"
                    />
                    <motion.div 
                        animate={{ 
                            y: [0, 30, 0],
                            rotate: [0, -10, 0]
                        }}
                        transition={{ 
                            duration: 7, 
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[20%] right-[15%] w-16 h-16 border-4 border-[#191b37]/10 rounded-full hidden md:block"
                    />
                </div>
            </div>
        </div>
    );
}
