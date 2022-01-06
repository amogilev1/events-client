import { textareaAutoResize } from "materialize-css";
import { useState, useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const successNotify = (message) => {
        window.M.toast({html: message, classes: 'green' })
    }

    const errorNotify = (message) => {
        window.M.toast({html: message, classes: 'red' })
    }

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                errorNotify('Ошибка')
            } else {
                //successNotify('Ок')
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            errorNotify(e.message)
        }
    }, [])

    const clearError = () => setError(null)

    return { loading, request, error, clearError }
}