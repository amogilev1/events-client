import 'materialize-css'
import { BrowserRouter } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CreateEventPage } from './pages/CreateEventPage'
import { EventsPage } from './pages/EventsPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth.context'
import { useRoutes } from './routes'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { ToastContainer } from 'react-toastify'

let isAuthenticated = true

function App() {
    const { token, login, logout, userId } = useAuth()
    isAuthenticated = !!token

    const routes = useRoutes(isAuthenticated)
    return (
        <body>
            <BrowserRouter>
                <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>


                    {isAuthenticated && <Navbar />}
                    <main>
                        <div className="container">
                            {routes}
                        </div>
                        <ToastContainer />
                    </main>
                    {isAuthenticated && <Footer />}


                </AuthContext.Provider>
            </BrowserRouter>
        </body>)
}

export default App