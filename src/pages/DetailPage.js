import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { AuthContext } from "../context/auth.context"
import { useHttp } from '../hooks/http.hook'
import { useNotify } from '../hooks/notify.hook'

export const DetailPage = () => {
    const eventId = useParams().id
    const { token, userId, isAdmin } = useContext(AuthContext)
    const [eventData, setEventData] = useState({})
    const { loading, request } = useHttp()
    const { successNotify, errorNotify } = useNotify()

    const fetchEventData = useCallback(async () => {
        try {   
                const fetched = await request('/api/event', 'GET', null, { Authorization: `Bearer ${token}`, id: eventId })

                const user = await request('/api/user', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: fetched.values[0].user_id
                })
                const eventTemplate = await request('/api/eventTemplate', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: fetched.values[0].event_template_id
                })
                const measure = await request('/api/measure', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: fetched.values[0].measure_id
                })

                setEventData(
                    {
                        eventTemplate: eventTemplate.values[0].event_name,
                        measure: measure.values[0].measure_name,
                        additionalInfo: fetched.values[0].additional_info,
                        workplaceId: fetched.values[0].workplace_id,
                        user: user.values[0].name + " " + user.values[0].second_name,
                        confirmed: fetched.values[0].confirmed,
                        timestamp: fetched.values[0].timestamp,
                        closeInfo: fetched.values[0].close_info
                    }
                )
        } catch (e) { }
    }, [token, request, eventId, setEventData])

    useEffect(async () => {
        await fetchEventData()
    }, [fetchEventData])

    const onConfirmHandler = async e => {
        try {
            await request('/api/events/confirm', 'POST', { id: eventId } , { Authorization: `Bearer ${token}` })
            await fetchEventData()
            successNotify('Событие успешно подтверждено')
        } catch (e) {
            errorNotify('Не удалось подтвердить событие')
        }
    }
    
    const canConfirm = isAdmin && eventData.confirmed != 1
    
    return (
        <div>
            <h1>Событие № {eventId}</h1>
            <p>Тип события: {eventData.eventTemplate}</p>
            <p>Предпринятые меры: {eventData.measure}</p>
            <p>Пользователь: {eventData.user}</p>
            <p>Рабочее место: {eventData.workplaceId}</p>
            <p>Дополнительная информация: {eventData.additionalInfo}</p>
            <p>Завершение события: {eventData.closeInfo}</p>
            <p>Подтверждено руководителем: {eventData.confirmed == 0 ? "Нет" : "Да"}</p>
            <p>Дата создания: {eventData.timestamp}</p>
            <div className="card-action">
                {canConfirm && <button className="btn black darken-3" onClick={onConfirmHandler}>Подтвердить событие</button>}
            </div>
        </div>
    )
}