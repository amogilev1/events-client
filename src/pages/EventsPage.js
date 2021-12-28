import React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react/cjs/react.development'
import { EventsList } from '../components/eventsList'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const EventsPage = () => {
    const [events, setEvents] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchEvents = useCallback(async () => {
        try {
            const fetched = await request('api/events', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            const newArr = fetched.values.map(async element => {
              const user = await request('api/user', 'GET', null, {
                Authorization: `Bearer ${token}`,
                id:element.user_id
              })
              return {
                  timestamp: element.timestamp,
                  additionalInfo: element.additional_info,
                  userName: user.name
              }
            })
            console.log(newArr)
            setEvents(newArr)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchEvents()
    }, [fetchEvents])

    return (
        <div>
            <h1>Журнал событий</h1>
            <a className="waves-effect waves-light btn orange darken-3" href="/events/create">Добавить событие</a>
            {!loading && <EventsList events={events} />}
        </div>
    )
}