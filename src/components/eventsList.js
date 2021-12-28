import React from "react"

export const EventsList = ({ events }) => {
    if (events.length <= 0) {
        return(
            <p className="center">Событий пока нет</p>
        )
    }
    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Событие</th>
                    <th>Предпринятые меры</th>
                    <th>Пользователь</th>
                    <th>Дополнительная информация</th>
                    <th>Подтверждено руководителем</th>
                </tr>
            </thead>

            <tbody>
                {events.map(event => {
                    return (
                        <tr>
                            <td>{event.timestamp}</td>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>{event.userName}</td>
                            <td>{event.additionalInfo}</td>
                            <td>Нет</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}