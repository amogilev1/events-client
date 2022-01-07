import { React } from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

export const CreateEventPage = () => {
    const navigate = useNavigate()
    const [eventTemplates, setEventTemplates] = useState([])
    const [measures, setMeasures] = useState([])
    const [requestBody, setRequestBody] = useState({
        eventTemplateId: null, measureId: null, additionalInfo: '', workplaceId: 1
    })

    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchEventTemplates = useCallback(async () => {
        try {
            const fetched = await request('/api/eventTemplates', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setEventTemplates(fetched.values)
        } catch (e) { }
    }, [token, request])

    const fetchMeasures = useCallback(async () => {
        try {
            const fetched = await request('/api/measures', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeasures(fetched.values)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchEventTemplates()
        fetchMeasures()
    }, [fetchEventTemplates, fetchMeasures])

    const changeHandler = (e) => {
        e.preventDefault()
        setRequestBody({ ...requestBody, [e.target.name]: e.target.value })
        console.log(requestBody)
    }
    
    const addEventHandler = async (e) => {
        try {
            e.preventDefault()
            const data = await request('/api/events', 'POST', { ...requestBody } , { Authorization: `Bearer ${token}` })
            navigate('/events')
        } catch (e) {
        }
    }

    return (
        <div>
            <h1>Добавить событие</h1>
            <form className="col s12">
                <div className="row">
                    <label>Выберите существующее событие</label>
                    <div className="input-field col s12">

                        <select className="browser-default" name="eventTemplateId" onChange={changeHandler}>
                            {eventTemplates.map(template => {
                                return (

                                    <option value={template.id}>{template.event_name}</option>

                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <label>Выберите Предпринятые меры</label>
                    <div className="input-field col s12">

                        <select className="browser-default" name="measureId" onChange={changeHandler}>
                            {measures.map(measure => {
                                return (

                                    <option value={measure.id}>{measure.measure_name}</option>

                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="first_name" type="text" className="validate" name="additionalInfo" onChange={changeHandler} />
                        <label htmlFor="first_name">Дополнительная информация</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn black darken-3" onClick={addEventHandler}>Добавить событие</button>
                </div>
            </form>
        </div>
    )
}