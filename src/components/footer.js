import React from "react"

export const Footer = () => {
    return (
        <footer className="page-footer black darken-3">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">ZAVOD</h5>
                <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Ссылки</h5>
                <ul>
                  <li><a className="grey-text text-lighten-3" href="#!">Журнал событий</a></li>
                  <li><a className="grey-text text-lighten-3" href="#!">Пользователи</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
    )
}