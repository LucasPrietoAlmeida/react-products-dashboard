import { getToken } from "./auth"

export interface Product {
    id: number
    name: string
    price: number
    tags: string[]
    isOnSale: boolean
    description: string
}

const API_URL = "http://localhost:8000/api/products"

export async function getProducts(): Promise<Product[]> {
    const token = getToken()
    if(!token) throw new Error("No auth token")

    const res = await fetch(API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })

    if(!res.ok) throw new Error('Error al obtener productos')

    return res.json()
}

export async function getProduct(id: string): Promise<Product | null> {
    const token = getToken()
    if (!token) throw new Error("No auth token")

    const res = await fetch(`${API_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error("Error al obtener producto")

    return res.json()
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
    const token = getToken()
    if (!token) throw new Error("No auth token")

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    })

    if (!res.ok) throw new Error("Error al crear producto")

    return res.json()
}

export async function deleteProduct(id: number): Promise<void> {
    const token = getToken()
    if (!token) throw new Error("No auth token")

    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    if (!res.ok) throw new Error("Error al borrar producto")
}
