import React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { EventsList } from '../components/eventsList'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const EventsPage = () => {
    const maxElementsOnPage = 2
    const [pages, setPages] = useState({})
    const [events, setEvents] = useState([])
    const [workplaceFilter, setWorkplaceFilter] = useState('all')
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchEvents = useCallback(async () => {
        try {
            const fetched = await request('api/events', 'GET', null, {
                Authorization: `Bearer ${token}`,
                Workplace: workplaceFilter
            })
            const elementsCount = fetched.values.length
            const newArr = await Promise.all(fetched.values.map(async element => {
                const user = await request('api/user', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: element.user_id
                })
                const eventTemplate = await request('api/eventTemplate', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: element.event_template_id
                })
                const measure = await request('api/measure', 'GET', null, {
                    Authorization: `Bearer ${token}`,
                    id: element.measure_id
                })
                const eventTemplateName = eventTemplate.values.length > 0 ? eventTemplate.values[0].event_name : 'нет'
                const measureName = measure.values.length > 0 ? measure.values[0].measure_name : 'нет'
                const userName = user.values.length > 0 ? `${user.values[0].name} ${user.values[0].second_name}` : 'Пользователь удален'
                return {
                    timestamp: element.timestamp.substring(0, element.timestamp.length - 5),
                    additionalInfo: element.additional_info,
                    userName: userName,
                    workplace: element.workplace_id,
                    eventTemplateName: eventTemplateName,
                    measureName: measureName,
                    confirmed: element.confirmed,
                    id: element.id
                }
            }))
            setEvents(newArr)
        } catch (e) { }
    }, [token, request, workplaceFilter, maxElementsOnPage])

    useEffect(() => {
        window.M.AutoInit()
        fetchEvents()
    }, [fetchEvents])

    const onWorkplaceFilterChange = (e) => {
        setWorkplaceFilter(e.target.value)
        fetchEvents()
    }

    return (
        <div>
            <h1>Журнал событий</h1>
            <a className="waves-effect waves-light btn black darken-3" href="/events/create">Добавить новое событие</a>
            <div className="event-filters">
                <div className="row">
                    <div class="input-field col s3 inline">
                        <select>
                            <option value="1">За все время</option>
                            <option value="2">За сегодня</option>
                            <option value="3">За последнюю неделю</option>
                            <option value="3">За последний месяц</option>
                        </select>
                        <label>Дата</label>
                    </div>
                    <div class="input-field col s3 inline">
                        <select onChange={onWorkplaceFilterChange}>
                            <option value="all">Любое</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label>Рабочее место</label>
                    </div>
                    <div class="input-field col s3 inline">
                        <select>
                            <option value="1">Любые</option>
                            <option value="2">Подтверждено</option>
                            <option value="3">Не подтверждено</option>
                        </select>
                        <label>Подтверждено руководителем</label>
                    </div>
                </div>
            </div>
            {!loading && <EventsList events={events} />}

            <center>
                <ul className="pagination">
                    <li className="disabled"><a href="#!"><i class="material-icons ">chevron_left</i></a></li>
                    <li className="active black darken-3"><a href="#!">1</a></li>
                    <li className="waves-effect"><a href="#!">2</a></li>
                    <li className="waves-effect"><a href="#!">3</a></li>
                    <li className="waves-effect"><a href="#!">4</a></li>
                    <li className="waves-effect"><a href="#!">5</a></li>
                    <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>
            </center>
        </div>
    )
}