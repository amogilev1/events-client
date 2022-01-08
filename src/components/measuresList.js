import React from "react"
import { MeasuresActions } from "./measuresActions"

export const MeasuresList = ({ measures }) => {
    if (measures.length <= 0) {
        return (
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
                {measures.map(measure => {
                    return (
                        <tr>
                            <td>{measure.id}</td>
                            <td>{measure.measure_name}</td>
                            <td><MeasuresActions id={measure.id}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}