import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import LaboratoriosList from "./pages/LaboratoriosList"
import LaboratorioForm from "./pages/LaboratorioForm"
import LaboratorioDetails from "./pages/LaboratorioDetails"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<LaboratoriosList />} />
            <Route path="/laboratorios" element={<LaboratoriosList />} />
            <Route path="/laboratorios/novo" element={<LaboratorioForm />} />
            <Route path="/laboratorios/editar/:id" element={<LaboratorioForm />} />
            <Route path="/laboratorios/:id" element={<LaboratorioDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App