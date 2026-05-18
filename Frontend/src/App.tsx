import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/pages/Hero"
import Tentang from "@/pages/Tentang"
import Kategori from "@/pages/Kategori"
import Tujuan from "@/pages/Tujuan"
import Timeline from "@/pages/Timeline"
import Juknis from "@/components/layout/Juknis"
import Sponsor from "@/pages/Sponsor"
import LoadingScreen from "@/components/layout/LoadingScreen"
import { ScrollReveal } from "@/components/layout/ScrollReveal"
import Faq from "@/pages/Faq"
import ScrollToTop from "@/components/layout/ScrollToTop"
import FormGenetic from "@/pages/Form/FormGenetic"
import FormDinamic from "@/pages/Form/FormDinamic"
import NotFound from "@/pages/NotFound"
import FormItcomp from "@/pages/Form/FormItcomp"
import Event from "./pages/Event"
import Junlak from "./pages/Junlak"
import FormSubmitGenetic from "./pages/Submit-Karya/FormSubmitGenetic"
import FormSubmitDinamic from "./pages/Submit-Karya/FormSubmitDinamic"

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
        <Route  
        path='/Event/*'
        element= {
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
              <Event />
            </main>
          </div>
        }
        />
        <Route  
        path='/Junlak'
        element= {
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
              <Junlak />
            </main>
          </div>
        }
        />
        <Route path='/SubmitGenetic' element={<FormSubmitGenetic />} />
        <Route path='/SubmitDinamic' element={<FormSubmitDinamic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
