import React from "react"
import { UsersActions } from "./usersActions"

export const UsersList = ({ users }) => {
    if (users.length <= 0) {
        return(
            <p className="center">Пользователей пока нет</p>
        )
    }
    return (
        <table className="striped-highlight">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>e-mail</th>
                    <th>Роль</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => {
                    const userRole = user.role_id == 1 ? 'Администратор' : 'Пользователь' 
                    return (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.second_name}</td>
                            <td>{user.email}</td>
                            <td>{userRole}</td>
                            <td><UsersActions id={user.id}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}