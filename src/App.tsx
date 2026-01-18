import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProductsPage from "./pages/ProductsPage"
import ProductPage from "./pages/ProductPage"
import NewProductPage from "./pages/NewProductPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./routes/ProtectedRoute"
import Navbar from "./pages/Navbar"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/" 
          element={
          <ProtectedRoute>
            <Navigate to="/products" replace />
          </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
          } 
        />
        <Route 
          path="/products/new"
          element={
            <ProtectedRoute>
              <NewProductPage />
            </ProtectedRoute>
          } 
        />
        <Route 
        path="/products/:id" 
        element={
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
          } 
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
