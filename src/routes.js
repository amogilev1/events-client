import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage'
import { AuthPage } from './pages/AuthPage'
import { CreateEventPage } from './pages/CreateEventPage'
import { DetailPage } from './pages/DetailPage'
import { EditEventPage } from './pages/EditEventPage'
import { EventsPage } from './pages/EventsPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { UsersPage } from './pages/UsersPage'

export const useRoutes = (isAuthenticated, isAdmin) => {
    console.log(isAuthenticated)
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/create" element={<CreateEventPage />} />
                <Route path="/event/update/:id" element={<EditEventPage />} />
                <Route path="/event/:id" element={<DetailPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                {isAdmin && <Route path="/users" element={<UsersPage />} />}
                {isAdmin && <Route path="/admin" element={<AdminPage />} />} 
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