import React from "react"
import { EventActions } from "./eventActions"

export const EventsList = ({ events }) => {
    if (events.length <= 0) {
        return(
            <p className="center">Событий пока нет</p>
        )
    }

    return (
        <table className="striped-highlight">
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Событие</th>
                    <th>Предпринятые меры</th>
                    <th>Пользователь</th>
                    <th>Место</th>
                    <th>Дополнительная информация</th>
                    <th>Подтверждено руководителем</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                {events.map(event => {
                    return (
                        <tr>
                            <td>{event.timestamp}</td>
                            <td>{event.eventTemplateName}</td>
                            <td>{event.measureName}</td>
                            <td>{event.userName}</td>
                            <td>{event.workplace}</td>
                            <td>{event.additionalInfo}</td>
                            <td>{event.confirmed <= 0 ? 'Нет' : 'Да'}</td>
                            <td>
                                <EventActions id={event.id} />
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}