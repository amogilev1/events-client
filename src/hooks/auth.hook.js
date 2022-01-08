import { useCallback, useState, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const[token, setToken] = useState(null)
    const[userId, setUserId] = useState(null)
    const[isAdmin, setIsAdmin] = useState(false)

    const login = useCallback((jwtToken, id, roleId) => {
        setToken(jwtToken)
        setUserId(id)
        setIsAdmin(roleId === 1)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, roleId: roleId}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsAdmin(false)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userId, data.roleId)
        }
    }, [login])

    return {login, logout, token, userId, isAdmin}
}