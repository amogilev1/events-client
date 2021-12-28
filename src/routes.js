import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreateEventPage } from './pages/CreateEventPage'
import { EventsPage } from './pages/EventsPage'

export const useRoutes = (isAuthenticated) => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="*" element={<EventsPage />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="*" element={<AuthPage />} />
            </Routes>
        )
    }
}