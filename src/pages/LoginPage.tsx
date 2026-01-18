import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { saveToken } from "../services/auth"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        try {
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: email, password }),
        })

        if (!response.ok) {
            throw new Error("Credenciales incorrectas")
        }

        const data = await response.json()

        saveToken(data.accessToken, remember)
        navigate("/products")
        } catch {
        setError("Login incorrecto")
        }
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="remember">
                        <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        />
                    Recordar sesión
                    </label>
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
