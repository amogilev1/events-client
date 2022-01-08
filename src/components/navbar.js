import React from "react"
import { NavLink } from "react-router-dom"
import { useContext } from "react/cjs/react.development"
import { AuthContext } from "../context/auth.context"

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
    };
    return (
        <header>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <nav>
                <div className="nav-wrapper black darken-3" style={{ padding: '0 2rem' }}>
                    <a href="#" className="brand-logo">Группа мониторинга БИТО ОКР</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {auth.isAdmin && <li><NavLink to="/users">Пользователи</NavLink></li>}
                        {auth.isAdmin && <li><NavLink to="/admin">Шаблоны</NavLink></li>}
                        <li><NavLink to="/events">События</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};