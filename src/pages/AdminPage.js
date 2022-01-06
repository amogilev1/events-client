import React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { EventTemplatesList } from '../components/eventTemplatesList'
import { LoadingComponent } from '../components/loading'
import { MeasuresList } from '../components/measuresList'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const AdminPage = () => {
    const [eventTemplates, setEventTemplates] = useState([])
    const [measures, setMeasures] = useState([])
    const [newEventTemplateName, setNewEventTemplateName] = useState('')
    const [newMeasureName, setNewMeasureName] = useState('')
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchTemplates = useCallback(async () => {
        try {
            const fetched = await request('api/eventTemplates', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setEventTemplates(fetched.values)
        } catch (e) { }
    }, [token, request])

    const fetchMeasures = useCallback(async () => {
        try {
            const fetched = await request('api/measures', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setMeasures(fetched.values)
        } catch (e) { }
    }, [token, request])

    const onNewEventTemplateChange = e => {
        setNewEventTemplateName(e.target.value)
    }

    const onNewMeasureChange = e => {
        setNewMeasureName(e.target.value)
        console.log(newMeasureName)
    }

    useEffect(() => {
        fetchTemplates()
        fetchMeasures()
    }, [fetchTemplates, fetchMeasures])

    const addNewEventHandler = async e => {
        try {
            const data = await request('/api/eventTemplates', 'POST', {eventName: newEventTemplateName})
        } catch (err) {
        }
    }

    const addNewMeasureHandler = async e => {
        try {
            const data = await request('/api/measures', 'POST', {measureName: newMeasureName})
        } catch (err) {
        }
    }

    return (
        <div>
            <h3 > Шаблоны событий </h3>
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="first_name" type="text" className="validate" name="newEventTemplateName" value={newEventTemplateName} onChange={onNewEventTemplateChange} />
                        <label htmlFor="first_name">Название нового события</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn black darken-3" onClick={addNewEventHandler} >Добавить новое событие</button>
                </div>
            </form>
            {loading && < LoadingComponent />}
            {!loading && < EventTemplatesList eventTemplates={eventTemplates} />}

            <h3 > Шаблоны мер </h3>
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="first_name" type="text" className="validate" name="newMeasure" value={newMeasureName} onChange={onNewMeasureChange} />
                        <label htmlFor="first_name">Название новой меры</label>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn black darken-3" onClick={addNewMeasureHandler} >Добавить новую меру</button>
                </div>
            </form>
            {loading && < LoadingComponent />}
            {!loading && < MeasuresList measures={measures} />}
        </div>
    )
}