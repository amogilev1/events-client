import { textareaAutoResize } from "materialize-css";
import { useState, useCallback } from "react"
import { ToastContainer, toast } from 'react-toastify';

export const useNotify = () => {
    const successNotify = (message) => {
        window.M.toast({html: message, classes: 'green' })
    }

    const errorNotify = (message) => {
        window.M.toast({html: message, classes: 'red' })
    }
    return { successNotify, errorNotify }
}