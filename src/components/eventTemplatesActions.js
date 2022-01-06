import React from "react";
import { useContext } from "react/cjs/react.development"
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from "../context/auth.context"

export const EventTemplatesActions = ({id}) => {
    const auth = useContext(AuthContext)
    const { loading, error, request } = useHttp()
    const { token } = useContext(AuthContext)

    const onDeleteHandler = async e => {
        try {
            const data = await request('/api/eventTemplates/remove', 'POST', { eventId: id } , { Authorization: `Bearer ${token}` })
            window.location.reload()
        } catch (e) {
        }
    }

    return (
        <div>
            <a className="btn-floating btn-small waves-effect waves-light red"><i className="tiny material-icons" onClick={onDeleteHandler} >delete</i></a>
        </div>
    )
};