import { Outlet } from "react-router-dom"
import Navbar from "../pages/Navbar"
import ProtectedRoute from "./ProtectedRoute"

export default function ProtectedLayout() {
    return (
        <ProtectedRoute>
            <Navbar />
            <Outlet />
        </ProtectedRoute>
    )
}
