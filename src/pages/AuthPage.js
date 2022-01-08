import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useNotify } from '../hooks/notify.hook'


export const AuthPage = () => {
    const { successNotify, errorNotify } = useNotify()
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const pressHandler = (event) => {
        if (event.key === 'Enter') {
            loginHandler()
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/signin', 'POST', { ...form })
            auth.login(data.values.token, data.values.userId, data.values.roleId)
            if (data.values.token) {
                successNotify('Авторизация прошла успешно')
            }
        } catch (e) {
        }
    }

    return (
        <div className="row" onKeyPress={pressHandler}>
            <div className="col s6 offset-s3">
                <h3>Журнал учета событий </h3>
                <h4>группы мониторинга БИТО ОКР</h4>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите логин"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Логин</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn black darken-4" onClick={loginHandler} disabled={loading}>Войти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}