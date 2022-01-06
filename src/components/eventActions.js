import React from "react";
import { useContext } from "react/cjs/react.development"
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from "../context/auth.context"
import { useNavigate } from 'react-router-dom'

export const EventActions = ({id}) => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const { token } = useContext(AuthContext)

    const onDeleteHandler = async e => {
        try {
            e.preventDefault()
            const data = await request('/api/events/remove', 'POST', { eventId: id } , { Authorization: `Bearer ${token}` })
            window.location.reload()
        } catch (e) {
        }
    }

    return (
        <div>
            <a className="btn-floating btn-small waves-effect waves-light red"><i className="tiny material-icons" onClick={onDeleteHandler} >delete</i></a>
            <a className="btn-floating btn-small waves-effect waves-light blue"><i className="tiny material-icons">edit</i></a>
        </div>
    )
};