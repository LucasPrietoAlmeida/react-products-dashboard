import { useNavigate } from "react-router-dom"
import { removeToken } from "../services/auth"

export default function LogoutButton() {
    const navigate = useNavigate()

    return (
        <button className="logout-button"
        onClick={() => {
            removeToken()
            navigate("/login")
        }}
        >
        Logout
        </button>
    )
}

