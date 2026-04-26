import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/layout/Navbar"
import Hero from "./ui/pages/Hero"
import Tentang from "./ui/pages/Tentang"
import Kategori from "./ui/pages/Kategori"
import Tujuan from "./ui/pages/Tujuan"
import Timeline from "./ui/pages/Timeline"
import Juknis from "./components/layout/Juknis"
import Sponsor from "./ui/pages/Sponsor"
import LoadingScreen from "./components/layout/LoadingScreen"
import { ScrollReveal } from "./components/layout/ScrollReveal"
import Faq from "./ui/pages/Faq"
import ScrollToTop from "./components/layout/ScrollToTop"
import FormGenetic from "./ui/pages/Form/Form-Genetic"
import FormDinamic from "./ui/pages/Form/Form-Dinamic"
import NotFound from "./ui/pages/notFound"
import FormItcomp from "./ui/pages/Form/Form-Itcomp"

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const offset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }, 500);
      }
    }
  }, [location]);

  return (
    <>
    <ScrollToTop />
    <LoadingScreen />
    <Routes>
        <Route
          path='/'
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="grow">
                <Hero />
                <ScrollReveal>
                  <Tentang />
                </ScrollReveal>
                <ScrollReveal>
                  <Tujuan />
                </ScrollReveal>
                <ScrollReveal>
                  <Kategori />
                </ScrollReveal>
                <ScrollReveal>
                  <Timeline />
                </ScrollReveal>
                <ScrollReveal>
                  <Sponsor />
                </ScrollReveal>
                <ScrollReveal>
                  <Faq />
                </ScrollReveal>
              </main>
              <Juknis />
            </div>
          }
        />
        <Route 
        path='/FormGenetic'
        element={
          <FormGenetic />
        }/>
        <Route  
        path='/FormDinamic'
        element= {
          <FormDinamic />
        }
        />
        <Route  
        path='/FormItcomp'
        element= {
          <FormItcomp />
        }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
