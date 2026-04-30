// import CircularGallery from "../../lib/CircularGallery";

import { motion } from "motion/react";

export default function Tentang() {
  // const galleryItems = [
  //   { image: 'https://picsum.photos/800/1200?random=1', text: 'Inovasi Digital' },
  //   { image: 'https://picsum.photos/800/1200?random=2', text: 'Kreativitas Muda' },
  //   { image: 'https://picsum.photos/800/1200?random=3', text: 'Teknologi Masa Depan' },
  //   { image: 'https://picsum.photos/800/1200?random=4', text: 'Kolaborasi Sistem' },
  //   { image: 'https://picsum.photos/800/1200?random=5', text: 'Visi Berdampak' },
  // ];

  return (
    // w-1/1 sm:w-280
    <div data-aos="fade-up" className="bg-[#fffffe]" id="Tentang">
      <div className="text-black mx-auto p-6 min-h-full flex flex-col items-center">
        <div className="flex items-center w-full max-w-2xl mb-6">
            <div className="h-0.5 bg-linear-to-r from-transparent to-[#e21c70] grow rounded-full"></div>
            <h2 className="px-6 text-sm sm:text-lg font-bold text-black uppercase tracking-[0.3em] text-center whitespace-nowrap">
              Tentang DIGIFEST
            </h2>
            <div className="h-0.5 bg-linear-to-l from-transparent to-[#e21c70] grow rounded-full"></div>
          </div>
  
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="px-4 text-3xl sm:text-4xl text-center font-bold mb-12 text-[#191b37] font-montserrat"
        >
          Apa itu <span className="text-[#e21c70]">DIGIFEST</span>?
        </motion.h1>
        <div>
          <p className="text-sm sm:text-base text-center font-montserrat py-0 px-5 sm:px-15">
            <span className="text-[#e21c70]">Digital Innovation Grand Festival (DIGIFEST)</span> hadir sebagai festival
            inovasi dan kompetisi teknologi tingkat nasional yang mewadahi
            generasi muda untuk mengeksplorasi potensi dan menciptakan solusi
            digital. Diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi
            (HIMMATISI) Universitas Semarang berkolaborasi dengan Developer Community Universitas Semarang (DECOMUS),&nbsp;
            <span className="text-[#e76297]">DIGIFEST</span> mengusung tema "SYNERGY (System, Youth, and Next-Generation
            Technology)". Tema ini mencerminkan semangat kuat dalam
            menggabungkan kolaborasi sistem, kreativitas generasi muda, dan
            teknologi masa depan menjadi satu kesatuan visi yang berdampak.
          </p>
        </div>
      </div>
  );
}
