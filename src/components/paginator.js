import React from "react"

export const Paginator = ({currentPage, pageNumber, setCurrentPage}) => {
    const onClickHandler = e => {
        setCurrentPage(pageNumber)
    }
    if (currentPage === pageNumber) {
        return (
            <li className="active black darken-3"><a href="#!" onClick={onClickHandler}>{ pageNumber }</a></li>
        )
    } else {
        return (
            <li className="waves-effect"><a href="#!" onClick={onClickHandler}>{ pageNumber }</a></li>
        )
    }
}