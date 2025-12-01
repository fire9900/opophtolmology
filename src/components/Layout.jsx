import {NavLink, Outlet} from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
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
            <footer className="footer">
                <div className="footer-column">
                    <p className="footer-column__name footer-column__name--title">OpOphtolmology</p>
                </div>
                <div className="footer-column">
                    <p className="footer-column__name">Тарифы</p>
                    <HashLink to="/#pricing-section" className="footer-column__link">Эконом</HashLink>
                    <HashLink to="/#pricing-section" className="footer-column__link">Стандарт</HashLink>
                    <HashLink to="/#pricing-section" className="footer-column__link">Профессионал</HashLink>
                </div>
                <div className="footer-column">
                    <p className="footer-column__name">Особенности</p>
                    <HashLink to="/#dignities-section" className="footer-column__link">Основные</HashLink>
                    <HashLink to="/#dignities-section" className="footer-column__link">Продвинутые</HashLink>
                    <HashLink to="/#dignities-section" className="footer-column__link">Интеграции</HashLink>
                </div>
                <div className="footer-column">
                    <p className="footer-column__name">Связь</p>
                    <HashLink to="#" className="footer-column__link">Контакты</HashLink>
                    <HashLink to="#" className="footer-column__link">Поддержка</HashLink>
                    <HashLink to="#" className="footer-column__link">Пользовательское соглашение</HashLink>
                </div>
            </footer>
        </>
    )
}

export default Layout