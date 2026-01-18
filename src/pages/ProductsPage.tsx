import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../services/products"
import type { Product } from "../services/products"
import "./ProductsPage.css"
import LogoutButton from "../components/LogoutButton"

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [filterName, setFilterName] = useState("")
    const [filterTag, setFilterTag] = useState("")
    const [filterOffer, setFilterOffer] = useState<"all" | "sale" | "normal">("all")

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch {
                setError("Error al cargar productos")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Generar lista de tags únicos para el select
    const uniqueTags = Array.from(
        new Set(products.flatMap(p => p.tags))
    )

    // Filtrar productos según inputs
    const filteredProducts = products.filter(p => {
        const matchesName = p.name.toLowerCase().includes(filterName.toLowerCase())
        const matchesTag = filterTag
            ? p.tags.some(t => t.toLowerCase() === filterTag.toLowerCase())
            : true
        const matchesOffer =
            filterOffer === "all"
                ? true
                : filterOffer === "sale"
                ? p.isOnSale
                : !p.isOnSale

        return matchesName && matchesTag && matchesOffer
    })

    if (loading) return <p>Cargando productos...</p>
    if (error) return <p>{error}</p>
    if (products.length === 0) return <p>No hay productos. <Link to="/products/new">Crea uno</Link></p>

    return (
        <div className="products-page">
            <LogoutButton />
            <h2>Listado de Productos</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                />

                <select value={filterTag} onChange={e => setFilterTag(e.target.value)}>
                    <option value="">Todos los tags</option>
                    {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>

                <select value={filterOffer} onChange={e => setFilterOffer(e.target.value as any)}>
                    <option value="all">Todos</option>
                    <option value="sale">Oferta</option>
                    <option value="normal">Normal</option>
                </select>

                <button onClick={() => { setFilterName(""); setFilterTag(""); setFilterOffer("all") }}>
                    Reset filtros
                </button>
            </div>

            <ul className="products-list">
                {filteredProducts.map(p => (
                    <li key={p.id}>
                        <Link to={`/products/${p.id}`}><strong>{p.name}</strong></Link>{" "}
                        - ${p.price} - {p.tags.join(", ")} - {p.isOnSale ? "Oferta" : "Normal"}
                    </li>
                ))}
            </ul>
        </div>
    )
}
