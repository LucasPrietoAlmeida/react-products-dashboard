import { Link, useNavigate } from "react-router-dom"
import { removeToken } from "../services/auth"
import "./Navbar.css"

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken()
        navigate("/login")
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/products" className="nav-link">Productos</Link>
                <Link to="/products/new" className="nav-link">Crear Producto</Link>
            </div>
            <div className="navbar-right">
                <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}
