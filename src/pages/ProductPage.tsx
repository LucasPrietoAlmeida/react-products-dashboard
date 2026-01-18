import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct, deleteProduct } from "../services/products"
import type { Product } from "../services/products"

export default function ProductPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deletedMessage, setDeletedMessage] = useState("")

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

    const handleDelete = async () => {
        if (!product) return
        await deleteProduct(product.id)
        setDeletedMessage("Producto borrado correctamente")
        navigate("/products")
    }

    if (loading) return <p>Cargando producto...</p>
    if (!product) return null

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: {product.price}</p>
            <p>Tags: {product.tags.join(", ")}</p>
            <p>{product.isOnSale ? "En oferta" : "No está en oferta"}</p>

            {deletedMessage && <p className="success">{deletedMessage}</p>}

            {!confirmDelete ? (
                <button onClick={() => setConfirmDelete(true)}>
                    Borrar producto
                </button>
            ) : (
                <>
                    <p>¿Seguro que quieres borrar este producto?</p>
                    <button onClick={handleDelete}>Sí, borrar</button>
                    <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
                </>
            )}
        </div>
    )
}
