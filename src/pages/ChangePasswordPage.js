import { React, useEffect, useState } from "react"
import { useContext } from 'react/cjs/react.development'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotify } from '../hooks/notify.hook'

export const ChangePasswordPage = () => {
    const userId = useParams().id
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const [form, setForm] = useState({
        password: '', passwordConfirm: ''
    })
    const { successNotify, errorNotify } = useNotify()

    useEffect(() => {
        window.M.updateTextFields()
        window.M.AutoInit()
    }, [])

    const changeHandler = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const postHandler = async (e) => {
        e.preventDefault()
        if (form.password !== form.passwordConfirm) {
            errorNotify('Пароли не совпадают')
            return
        }
        try {
            const data = await request('/api/users/update', 'PUT', { newPassword: form.password, userId: userId })
            navigate('/users')
            successNotify('Пароль обновлен')
        } catch (e) {
        }
    }

    return (
        <div>
            <h1>Смена пароля</h1>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" name="password" onChange={changeHandler} type="password" value={form.password} className="validate" />
                            <label htmlFor="password">Введите новый пароль</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="passwordConfirm" name="passwordConfirm" onChange={changeHandler} type="password" value={form.passwordConfirm} className="validate" />
                            <label htmlFor="passwordConfirm">Подтвердите новый пароль</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn black darken-3" onClick={postHandler}>Подтвердить</button>
                    </div>
                </form>
            </div>
        </div>
    )
}