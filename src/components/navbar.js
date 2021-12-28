import React from "react"
import { NavLink } from "react-router-dom"
import { useContext } from "react/cjs/react.development"
import { AuthContext } from "../context/auth.context"

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        //event.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper orange darken-3" style={{ padding: '0 2rem' }}>
                <a href="#" className="brand-logo">Завод</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/events/create">Добавить событие</NavLink></li>
                    <li><NavLink to="/events">События</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}