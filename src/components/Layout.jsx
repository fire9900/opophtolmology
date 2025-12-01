import { NavLink, Outlet } from "react-router-dom"
import "../assets/styles/layout.scss"

const Layout = () => {
    return (
        <>
            <header className="app-header">
                <a className="logo" href="/">
                    <img className="logo-icon" alt="Лого" src="/logo.png"></img>
                    <span>OpOphtolmology</span>
                </a>
                <nav className="nav">
                    <NavLink to="/imagebank">ImageBank</NavLink>
                    <NavLink to="/education">Обучение</NavLink>
                    <NavLink to="/analysis">Обработка фото</NavLink>
                    <NavLink to="/">Консультация</NavLink>
                </nav>
                <div className="user-avatar" title="Профиль пользователя">
                    <img src="/images/account_circle.png" alt=""/>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>2025</footer>
        </>
    )
}

export default Layout