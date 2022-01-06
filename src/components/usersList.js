import React from "react"

export const UsersList = ({ users }) => {
    if (users.length <= 0) {
        return(
            <p className="center">Пользователей пока нет</p>
        )
    }
    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>e-mail</th>
                    <th>Роль</th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => {
                    return (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.second_name}</td>
                            <td>{user.email}</td>
                            <td>Пользователь</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}