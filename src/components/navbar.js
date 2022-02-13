import React from "react"
import { NavLink } from "react-router-dom"
import { useContext, useEffect, useState, useCallback } from "react/cjs/react.development"
import { useAuth } from '../hooks/auth.hook'
import { AuthContext } from "../context/auth.context"

export const Navbar = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
    };
    
    const { name, lastname } = useAuth()

    return (
        <header>
            <ul id="dropdown1" class="dropdown-content">
                <li><a href="#!" onClick={logoutHandler}>Выйти</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper black darken-3" style={{ padding: '0 2rem' }}>
                    <a href="#" className="brand-logo">Группа мониторинга БИТО ОКР</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {auth.isAdmin && <li><NavLink to="/users">Пользователи</NavLink></li>}
                        {auth.isAdmin && <li><NavLink to="/admin">Шаблоны</NavLink></li>}
                        <li><NavLink to="/events">События</NavLink></li>

                        <li><a class="dropdown-trigger" a href="/" data-target="dropdown1"><i class="material-icons right">person</i>{auth.name + " " + auth.lastname}</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};