import React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { EventsList } from '../components/eventsList'
import { LoadingComponent } from '../components/loading'
import { Paginator } from '../components/paginator'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const EventsPage = () => {
    const [pagesCount, setPagesCount] = useState(1)
    const [dateFilter, setDateFilter] = useState('allTime')
    const [eventTemplates, setEventTemplates] = useState([])
    const [eventTemplateFilter, setEventTemplateFilter] = useState(null)
    const [eventsLoading, setEventsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [events, setEvents] = useState([])
    const [workplaceFilter, setWorkplaceFilter] = useState('all')
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [paginatorElements, setPaginatorElements] = useState([])

    const fetchEvents = useCallback(async () => {
        try {
            setEventsLoading(true)
            setEvents([])
            const fetched = await request('api/events', 'GET', null, {
                Authorization: `Bearer ${token}`,
                Workplace: workplaceFilter,
                Page: currentPage,
                test: dateFilter,
                Template: eventTemplateFilter
            })
            console.log('ale ' + fetched.values.length)
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
                    id: element.id,
                    userId: element.user_id,
                    closeInfo: element.close_info
                }
            }))
            setEvents(newArr)
            setEventsLoading(false)
        } catch (e) { }
    }, [token, request, workplaceFilter, currentPage, setEventsLoading, dateFilter, setEvents, eventTemplateFilter])

    const fetchEventTemplates = useCallback(async () => {
        try {
            const fetched = await request('/api/eventTemplates', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            fetched.values.unshift({id: 'null', event_name: 'Любое'})
            setEventTemplates(fetched.values)
        } catch (err) {

        }
    }, setEventTemplates)

    const fetchPagesCount = useCallback(async () => {
        try {
            setEventsLoading(true)
            setPagesCount(1)
            setEvents([])
            const fetched = await request('/api/events/count', 'GET', null, {
                Authorization: `Bearer ${token}`,
                Workplace: workplaceFilter,
                test: dateFilter,
                Template: eventTemplateFilter
            })
            setPagesCount(fetched.values)
            // Filling up paginators
            const elements = []
            for (let i = 0; i < fetched.values; i++) {
                elements.push(<Paginator pageNumber={i + 1} currentPage={currentPage} setCurrentPage={updateCurrentPage} />)
            }
            setPaginatorElements(elements)
            if (currentPage > fetched.values) {
                setCurrentPage(1)
            }
            setEventsLoading(false)
        } catch (e) { }
    }, [token, request, setPagesCount, setPaginatorElements, workplaceFilter, currentPage, setEvents, setEventsLoading, dateFilter, setCurrentPage, eventTemplateFilter])

    useEffect(async () => {
        await updateData()
        await fetchEventTemplates()
        window.M.AutoInit()

    }, [fetchEvents, fetchPagesCount, setEvents, fetchEventTemplates])

    const onWorkplaceFilterChange = (e) => {
        setWorkplaceFilter(e.target.value)
    }

    const onDateFilterChange = (e) => {
        setDateFilter(e.target.value)
    }

    const onEventTemplateFilterChanged = (e) => {
        setEventTemplateFilter(e.target.value)
    }

    const updateCurrentPage = useCallback(async (inPage) => {
        await setCurrentPage(inPage)
        await fetchEvents()
    }, [setCurrentPage, fetchEvents])

    const decrementCurrentPageHandler = (e) => {
        if (currentPage === 1) {
            return
        }
        setCurrentPage(currentPage - 1)
    }

    const incrementCurrentPageHandler = (e) => {
        if (currentPage === pagesCount) {
            return
        }
        setCurrentPage(currentPage + 1)
    }

    const updateData = async () => {
        await fetchPagesCount()
        await fetchEvents()
    }

    return (
        <div>
            <h1>Журнал событий</h1>
            <a className="waves-effect waves-light btn black darken-3" href="/CreateEvent">Добавить новое событие</a>
            <div className="event-filters">
                <div className="row">
                    <div className="input-field col s3 inline">
                        <select onChange={onDateFilterChange} value={dateFilter}>
                            <option value="allTime">За все время</option>
                            <option value="today">За сегодня</option>
                            <option value="week">За последнюю неделю</option>
                            <option value="month">За последний месяц</option>
                        </select>
                        <label>Дата</label>
                    </div>
                    <div className="input-field col s3 inline">
                        <select onChange={onWorkplaceFilterChange} value={workplaceFilter}>
                            <option value="all">Любое</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                        <label>Рабочее место</label>
                    </div>
                    <div className="input-field col s3 inline">
                        <select onChange={onEventTemplateFilterChanged} value={eventTemplateFilter}>
                            {eventTemplates.map(template => {
                                return (
                                    <option value={template.id}>{template.event_name}</option>
                                )
                            })}
                        </select>
                        <label>Событие</label>
                    </div>
                </div>
            </div>
            {eventsLoading && < LoadingComponent />}
            {!eventsLoading && <EventsList events={events} updatePageCallback={updateData} />}

            <center>
                <ul className="pagination">
                    {!eventsLoading && <li className={currentPage === 1 ? "disabled" : "waves-effect"}><a href="#!" onClick={decrementCurrentPageHandler}><i class="material-icons ">chevron_left</i></a></li>}
                    {!eventsLoading && paginatorElements}
                    {!eventsLoading && <li className={currentPage >= pagesCount ? "disabled" : "waves-effect"}><a href="#!" onClick={incrementCurrentPageHandler}><i className="material-icons">chevron_right</i></a></li>}
                </ul>
            </center>
        </div>
    )
}