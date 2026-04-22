import { Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Hero from "./ui/pages/Hero"
import Tentang from "./ui/pages/Tentang"

export default function App() {
  return (
    <>
    <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Hero />
              <Tentang />
            </>
          }
        />
        {/* <Route path='/project' element={< />} /> */}
      </Routes>
    </>
  )
}
