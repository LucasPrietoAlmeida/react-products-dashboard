import React from "react"
import { Navigate } from "react-router-dom"
import { getToken } from "../services/auth"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    return getToken() ? children : <Navigate to="/login" replace />
}
