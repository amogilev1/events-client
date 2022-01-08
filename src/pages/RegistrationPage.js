import { React, useEffect, useState } from "react"
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useNavigate } from 'react-router-dom'

export const RegistrationPage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        name: '', secondName: '', email: '', password: '', roleId: '2'
    })

    useEffect(() => {
        window.M.updateTextFields()
        window.M.AutoInit()
    }, [])

    const changeHandler = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(form)
    }

    const registrationHandler = async (e) => {
        try {
            e.preventDefault()
            const data = await request('/api/users', 'POST', { ...form })
            navigate('/users')
        } catch (e) {
        }
    }

    return (
        <div>
            <h1>Регистрация пользователя</h1>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="name" name="name" onChange={changeHandler} type="text" value={form.name} className="validate" />
                            <label htmlFor="first_name">Имя</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="secondName" name="secondName" onChange={changeHandler} type="text" value={form.secondName} className="validate" />
                            <label htmlFor="last_name">Фамилмя</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" name="password" onChange={changeHandler} type="password" value={form.password} className="validate" />
                            <label htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" name="email" onChange={changeHandler} type="email" value={form.email} className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <select name="roleId" onChange={changeHandler} value={form.roleId}>
                                <option value='2'>Пользователь</option>
                                <option value='1'>Администратор</option>
                            </select>
                            <label>Роль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn black darken-3" onClick={registrationHandler}>Зарегистрировать пользователя</button>
                    </div>
                </form>
            </div>
        </div>
    )
}