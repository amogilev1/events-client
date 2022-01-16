import React from "react"
import { EventActions } from "./eventActions"
import { AuthContext } from "../context/auth.context"
import { useContext } from "react/cjs/react.development"

export const EventsList = ({ events, updatePageCallback }) => {
    const auth = useContext(AuthContext)

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
                    <th>Завершение события</th>
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
                            <td>{event.closeInfo}</td>
                            <td><EventActions id={event.id} eventUserId={event.userId} updatePageCallback={updatePageCallback} confirmed={event.confirmed} /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}