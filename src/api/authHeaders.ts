import { getToken } from "../services/auth"

export function authHeaders() {
    const token = getToken()
    
    if(!token) return {}

    return {
        Authorization: `Bearer ${token}`
    }
}