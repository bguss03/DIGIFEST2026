import { Route, Routes } from "react-router-dom"
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
import Footer from "./components/layout/Footer"

export default function App() {
  return (
    <>
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
                  <Juknis />
                </ScrollReveal>
                <ScrollReveal>
                  <Sponsor />
                </ScrollReveal>
                <ScrollReveal>
                  <Faq />
                </ScrollReveal>
              </main>
              <Juknis />
              <Footer />
            </div>
          }
        />
        {/* <Route path='/project' element={< />} /> */}
      </Routes>
    </>
  )
}
