import { React } from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotify } from '../hooks/notify.hook'

export const EditEventPage = () => {
    const eventId = useParams().id
    const navigate = useNavigate()
    const [eventTemplates, setEventTemplates] = useState([])
    const [ownerUserId, setOwnerUserId] = useState(0)
    const [measures, setMeasures] = useState([])
    const [requestBody, setRequestBody] = useState({
        eventTemplateId: null, measureId: null, additionalInfo: '', workplaceId: 1, newEventTemplateName: '', newMeasureName: '', closeInfo: ''
    })

    const { loading, request } = useHttp()
    const { successNotify, errorNotify } = useNotify()
    const { token, isAdmin, userId } = useContext(AuthContext)

    const fetchEventData = useCallback(async () => {
        try {   
                const fetched = await request('/api/event', 'GET', null, { Authorization: `Bearer ${token}`, id: eventId })
                setRequestBody(
                    {
                        eventTemplateId: fetched.values[0].event_template_id,
                        measureId: fetched.values[0].measure_id,
                        additionalInfo: fetched.values[0].additional_info,
                        workplaceId: fetched.values[0].workplace_id,
                        newEventTemplateName: '',
                        newMeasureName: '',
                        closeInfo: fetched.values[0].close_info
                    }
                )
                if (!isAdmin && userId != fetched.values[0].user_id) {
                    navigate('/events')
                }
        } catch (e) { }
    }, [token, request, eventId, setRequestBody, isAdmin, userId])
    
    const fetchEventTemplates = useCallback(async () => {
        try {   
                const fetched = await request('/api/eventTemplates', 'GET', null, { Authorization: `Bearer ${token}` })
                setEventTemplates(fetched.values)
                requestBody['eventTemplateId'] = fetched.values[0].id
        } catch (e) { }
    }, [token, request])

    const fetchMeasures = useCallback(async () => {
        try {
            const fetched = await request('/api/measures', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeasures(fetched.values)
            requestBody['measureId'] = fetched.values[0].id
        } catch (e) { }
    }, [token, request])

    useEffect(async () => {
        await fetchEventTemplates()
        await fetchMeasures()
        await fetchEventData()
        window.M.AutoInit()
        window.M.updateTextFields()
    }, [fetchEventTemplates, fetchMeasures, fetchEventData])

    const changeHandler = (e) => {
        e.preventDefault()
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
    }

    const addEventHandler = async (e) => {
        try {
            e.preventDefault()
            if (requestBody.newEventTemplateName.length > 0) {
                // Adding new EventTemplate
                const newTemplateIdRes = await request('/api/eventTemplates', 'POST', { eventName: requestBody.newEventTemplateName }, { Authorization: `Bearer ${token}` })
                requestBody.eventTemplateId = newTemplateIdRes.values.insertId
            }
            if (requestBody.newMeasureName.length > 0) {
                // Adding new Measure
                const newMeasureRes = await request('/api/Measures', 'POST', { measureName: requestBody.newMeasureName }, { Authorization: `Bearer ${token}` })
                requestBody.measureId = newMeasureRes.values.insertId
            }
            const data = await request('/api/events/update', 'PUT', { ...requestBody, id: eventId }, { Authorization: `Bearer ${token}` })
            if (data) {
                successNotify('Событие успешно обновлено')
                navigate('/events')
            }
        } catch (e) {
        }
    }

    return (
        <div>
            <h1>Редактировать событие</h1>
            <form className="col s12">
                {isAdmin && <div><div className="row">
                    <div className="input-field col s6">

                        <select name="eventTemplateId" onChange={changeHandler} value={requestBody.eventTemplateId}>
                            {eventTemplates.map(template => {
                                return (

                                    <option value={template.id}>{template.event_name}</option>

                                )
                            })}
                        </select>
                        <label>Выберите существующее событие</label>
                    </div>
                    <div className="input-field col s6">
                        {isAdmin && <input id="newEventTemplateName" type="text" className="validate" name="newEventTemplateName" onChange={changeHandler} />}
                        {!isAdmin && <input disabled id="newEventTemplateName" type="text" className="validate" name="newEventTemplateName" onChange={changeHandler} />}
                        <label htmlFor="newEventTemplateName">Или введите новое</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select name="measureId" onChange={changeHandler} value={requestBody.measureId}>
                            {measures.map(measure => {
                                return (
                                    <option value={measure.id}>{measure.measure_name}</option>
                                )
                            })}
                        </select>
                        <label>Выберите предпринятые меры</label>
                    </div>
                    <div className="input-field col s6">
                        {isAdmin && <input id="newMeasureName" type="text" className="validate" name="newMeasureName" onChange={changeHandler} />}
                        {!isAdmin && <input disabled id="newMeasureName" type="text" className="validate" name="newMeasureName" onChange={changeHandler} />}
                        <label htmlFor="newMeasureName">Или введите новую</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select name="workplaceId" onChange={changeHandler} value={requestBody.workplaceId}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label>Выберите номер рабочего места</label>
                    </div>
                </div></div>}
                <div className="row">
                    <div className="input-field col s12">
                        <input id="first_name" type="text" className="validate" name="additionalInfo" value={requestBody.additionalInfo} onChange={changeHandler} />
                        <label htmlFor="first_name">Дополнительная информация</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="closeInfo" type="text" className="validate" name="closeInfo" value={requestBody.closeInfo} onChange={changeHandler} />
                        <label htmlFor="closeInfo">Завершение события</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn black darken-3" onClick={addEventHandler}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}