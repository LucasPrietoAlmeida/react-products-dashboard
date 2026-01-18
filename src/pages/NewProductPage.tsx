import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../services/products"
import "./FormPage.css"

export default function NewProductPage() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [isOnSale, setIsOnSale] = useState(false)

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
        navigate(`/products/${created.id}`)
    }

    return (
        <form onSubmit={handleSubmit} className="form-page">
            <h2>Nuevo producto</h2>

            <input className="form-input" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
            <input className="form-input" type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
            <textarea className="form-input" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
            <input className="form-input" placeholder="Tags (separados por coma)" value={tags} onChange={e => setTags(e.target.value)} />

            <div className="checkbox-field">
                <input
                    id="isOnSale"
                    type="checkbox"
                    checked={isOnSale}
                    onChange={e => setIsOnSale(e.target.checked)}
                />
                <label htmlFor="isOnSale">En oferta</label>
            </div>



            <button type="submit" className="form-button" disabled={!isValid}>Crear producto</button>
        </form>
    )
}
