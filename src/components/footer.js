import React from "react"
import logo from './tagmet.jpg'
import { useContext } from "react/cjs/react.development"
import { AuthContext } from "../context/auth.context"

export const Footer = () => {
  const auth = useContext(AuthContext)
  return (
    <footer className="page-footer black darken-3">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">ОКР БИТО</h5>
            <p className="grey-text text-lighten-4">Группа мониторинга производственных процессов и перемещения ТМЦ</p>
            <img src={logo} alt="logo"></img>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Ссылки</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">Журнал событий</a></li>
              {auth.isAdmin && <li><a className="grey-text text-lighten-3" href="#!">Пользователи</a></li>}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}