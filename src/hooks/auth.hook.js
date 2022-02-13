import { useCallback, useState, useEffect } from "react"
import { useHttp } from '../hooks/http.hook'

const storageName = 'userData'

export const useAuth = () => {
    const { request } = useHttp()
    const[token, setToken] = useState(null)
    const[userId, setUserId] = useState(null)
    const[isAdmin, setIsAdmin] = useState(false)
    const[name, setName] = useState('')
    const[lastname, setLastname] = useState('')


    const login = useCallback(async (jwtToken, id, roleId, name, lastname) => {
        setToken(jwtToken)
        setUserId(id)
        setIsAdmin(roleId === 1)

        setName(name)
        setLastname(lastname)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken, roleId: roleId, name: name, lastname: lastname}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setIsAdmin(false)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log(data)
        if (data && data.token) {
            login(data.token, data.userId, data.roleId, data.name, data.lastname)
        }
    }, [login])

    return {login, logout, token, userId, isAdmin, name, lastname}
}