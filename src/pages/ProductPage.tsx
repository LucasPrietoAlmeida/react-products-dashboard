import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, deleteProduct } from "../services/products"
import type { Product } from "../services/products"
import "./FormPage.css"

export default function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        if (!id) return
        getProduct(id)
            .then((data) => {
                if (!data) {
                    navigate("/404")
                    return
                }
                setProduct(data)
            })
            .finally(() => setLoading(false))
    }, [id, navigate])

    if (loading) return <p className="status">Cargando producto...</p>
    if (!product) return null

    return (
        <div className="form-page">
            <h2>{product.name}</h2>
            <p>Descripción: {product.description}</p>
            <p>Precio: {product.price}</p>
            <p>Tags: {product.tags.join(", ")}</p>
            <p>{product.isOnSale ? "En oferta" : "No está en oferta"}</p>

            {!confirmDelete ? (
                <button className="form-button delete" onClick={() => setConfirmDelete(true)}>Borrar producto</button>
            ) : (
                <>
                    <p>¿Seguro que quieres borrar este producto?</p>
                    <button className="form-button delete" onClick={async () => { await deleteProduct(product.id); navigate("/products") }}>
                        Sí, borrar
                    </button>
                    <button className="form-button" onClick={() => setConfirmDelete(false)}>Cancelar</button>
                </>
            )}
        </div>
    )
}
