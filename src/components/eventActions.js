import React from "react";
import { useContext } from "react/cjs/react.development"
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from "../context/auth.context"
import { useNotify } from '../hooks/notify.hook'

export const EventActions = ({id, eventUserId, confirmed, updatePageCallback}) => {
    const { request } = useHttp()
    const { token, userId, isAdmin } = useContext(AuthContext)
    const { successNotify, errorNotify } = useNotify()

    const onDeleteHandler = async e => {
        try {
            e.preventDefault()
            await request('/api/events/remove', 'POST', { eventId: id } , { Authorization: `Bearer ${token}` })
            await updatePageCallback()
            successNotify('Событие успешно удалено')
        } catch (e) {
            errorNotify('Не удалось удалить событие')
        }
    }

    const onConfirmHandler = async e => {
        try {
            await request('/api/events/confirm', 'POST', { id } , { Authorization: `Bearer ${token}` })
            await updatePageCallback()
            successNotify('Событие успешно подтверждено')
        } catch (e) {
            errorNotify('Не удалось подтвердить событие')
        }
    }

    const canConfirmEvent = isAdmin && !confirmed
    const cannotConfirm = isAdmin && confirmed

    return (
        <div>
            {isAdmin && <a className="btn-floating btn-small waves-effect waves-light red"><i className="tiny material-icons" onClick={onDeleteHandler} >delete</i></a>}
            <a className="btn-floating btn-small waves-effect waves-light blue" href={"event/update/" + id}><i className="tiny material-icons">edit</i></a>
             <a className="btn-floating btn-small waves-effect waves-light orange" href={"event/" + id}><i className="tiny material-icons" >info</i></a>
        </div>
    )
};