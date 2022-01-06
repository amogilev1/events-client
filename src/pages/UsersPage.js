import React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { EventsList } from '../components/eventsList'
import { LoadingComponent } from '../components/loading'
import { UsersList } from '../components/usersList'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const UsersPage = () => {
    const [users, setUsers] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchUsers = useCallback(async () => {
        try {
            const fetched = await request('api/users', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUsers(fetched.values)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <div>
            <h1 > Пользователи </h1>
            <a className="waves-effect waves-light btn black darken-3" href="/registration" > Добавить пользователя </a>
            {loading && < LoadingComponent />}
            {!loading && < UsersList users={users} />}
        </div>
    )
}