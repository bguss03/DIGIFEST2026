import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./ui/pages/Hero"
import Tentang from "./ui/pages/Tentang"

export default function App() {
  return (
    <>
    <Routes>
        <Route
          path='/'
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="grow">
                <Hero />
                <Tentang />
              </main>
            </div>
          }
        />
        {/* <Route path='/project' element={< />} /> */}
      </Routes>
    </>
  )
}
