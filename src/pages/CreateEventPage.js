import {React, useState} from 'react'

export const CreateEventPage = () => {
    const [eventName, setEventName] = useState('')
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Введите название события"
                        id="eventName"
                        type="text"
                        name="eventName"
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                    />
                    <label htmlFor="email">Событие</label>
                </div>
            </div>
        </div>
    )
}