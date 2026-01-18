import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../services/products"

export default function NewProductPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [isOnSale, setIsOnSale] = useState(false)
    const [createdMessage, setCreatedMessage] = useState("")

    const isValid = name && price && description

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isValid) return

        const product = {
            name,
            price: Number(price),
            description,
            tags: tags.split(",").map(t => t.trim()),
            isOnSale,
        }

        const created = await createProduct(product)
        setCreatedMessage("Producto creado correctamente")
        navigate(`/products/${created.id}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nuevo producto</h2>

            {createdMessage && <p className="success">{createdMessage}</p>}

            <input placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
            <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder="Tags (separados por coma)" value={tags} onChange={e => setTags(e.target.value)} />

            <label>
                <input type="checkbox" checked={isOnSale} onChange={e => setIsOnSale(e.target.checked)} />
                En oferta
            </label>

            <button type="submit" disabled={!isValid}>Crear producto</button>
        </form>
    )
}
