import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const targetId = path.substring(1);
      
      if (location.pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        navigate("/" + path);
      }
    }
  };

  const pesan = "Halo Admin, saya ingin bertanya tentang DIGIFEST.";
  const urlWa = `https://wa.me/6287837192478?text=${encodeURI(pesan)}`;

  return (
    <footer className="w-full bg-[#e9cfeb] text-[#191b37] font-montserrat pt-16 pb-8 px-6 sm:px-12 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12">
          <div className="md:col-span-6 lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-auto flex items-center justify-center">
                  <img src="/digifest-logo1.svg" alt="DIGIFEST Logo" className="h-12 w-auto" />
              </div>
              <h1
                onClick={(e) => handleNavClick(e, "#Beranda")}
                className="bg-[#191b37] bg-clip-text text-transparent text-lg font-bold transition-all duration-300 font-montserrat"
              >
                DIGIFEST
              </h1>
            </div>
            <p className="text-sm text-[#191b37] max-w-md opacity-75 leading-relaxed">
              Digital Innovation Grand Festival (DIGIFEST) merupakan kegiatan
              festival inovasi dan kompetisi teknologi tingkat nasional yang
              diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi
              (HIMMATISI) Universitas Semarang bekerja sama dengan Developer
              Community Universitas Semarang (DECOMUS).
            </p>
          </div>
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="md:col-span-3 flex flex-col">
            <h2 className="text-[#191b37] text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-[#e21c70] rounded-full"></span>
            </h2>
            <nav className="flex flex-col space-y-3 text-sm font-medium">
              <NavLink
                to="#Beranda"
                onClick={(e) => handleNavClick(e, "#Beranda")}
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300 flex items-center"
              >
                Beranda
              </NavLink>
              <NavLink
                to="#Tentang"
                onClick={(e) => handleNavClick(e, "#Tentang")}  
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300"
              >
                Tentang
              </NavLink>
              <NavLink
                to="#Tujuan"
                onClick={(e) => handleNavClick(e, "#Tujuan")}  
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300"
              >
                Tujuan
              </NavLink>
              <NavLink
                to="#Kategori"
                onClick={(e) => handleNavClick(e, "#Kategori")}
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300"
              >
                Kategori
              </NavLink>
            </nav>
          </div>
          <div className="md:col-span-3 flex flex-col">
            <h2 className="text-[#191b37] text-lg font-bold mb-6 relative inline-block">
              Kontak Kami
              <span className="absolute -bottom-1 left-0 w-8 h-1 bg-[#e21c70] rounded-full"></span>
            </h2>
            <div className="flex flex-col space-y-4 text-sm font-medium">
              <a 
                href={urlWa} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300 flex items-center gap-3"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#191b37]/5">
                  <FaWhatsapp size={14} />
                </div>
                +62 878-3719-2478 (Nova)
              </a>
              <a
                href="mailto:digifestusm@gmail.com"
                className="text-[#191b37] hover:text-[#e21c70] transition-colors duration-300 flex items-center gap-3"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#191b37]/5">
                  <FaEnvelope size={14} />
                </div>
                digifestusm@gmail.com
              </a>
            </div>
            
            <div className="flex flex-row space-x-3 mt-8">
              {[
                { icon: FaInstagram, url: "https://www.instagram.com/digifest.usm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { icon: FaXTwitter, url: "https://x.com/" },
                { icon: FaTiktok, url: "https://www.tiktok.com/" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#191b37]/10 bg-[#191b37]/5 text-[#191b37] hover:bg-[#191b37] hover:text-[#e9cfeb] hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-[#191b37]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-medium opacity-60">
          <p>© 2026 DIGIFEST. All rights reserved.</p>
          <p className="italic tracking-wide">
            Digital Innovation Grand Festival
          </p>
        </div>
      </div>
    </footer>
  );
}
