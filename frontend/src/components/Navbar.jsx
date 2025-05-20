import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Sistema de Gestão de Laboratórios</Link>
      </div>
    </nav>
  )
}

export default Navbar