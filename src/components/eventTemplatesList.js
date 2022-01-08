import React from "react"
import { EventTemplatesActions } from "./eventTemplatesActions"

export const EventTemplatesList = ({ eventTemplates }) => {
    if (eventTemplates.length <= 0) {
        return(
            <p className="center">Шаблонов пока нет</p>
        )
    }
    return (
        <table className="striped-highlight">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
            </thead>

            <tbody>
                {eventTemplates.map(eventTemplate => {
                    return (
                        <tr>
                            <td>{eventTemplate.id}</td>
                            <td>{eventTemplate.event_name}</td>
                            <td><EventTemplatesActions id={eventTemplate.id}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}