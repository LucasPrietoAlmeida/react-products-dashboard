import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../services/auth"

export default function LogoutButton() {
    const navigate = useNavigate()
    const [confirmLogout, setConfirmLogout] = useState(false)

    if (confirmLogout) {
        return (
            <div className="logout-confirm">
                <p>¿Seguro que quieres cerrar sesión?</p>
                <button onClick={() => { removeToken(); navigate("/login") }}>Sí, salir</button>
                <button onClick={() => setConfirmLogout(false)}>Cancelar</button>
            </div>
        )
    }

    return (
        <button className="logout-button" onClick={() => setConfirmLogout(true)}>
            Logout
        </button>
    )
}
