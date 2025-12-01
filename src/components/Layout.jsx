import { useEffect, useState } from "react"
import {Link, NavLink, Outlet, useNavigate} from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { getCurrentUser, logout } from "../services/authService"
import "../assets/styles/layout.scss"

const Layout = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    const handleUserAvatarClick = () => {
        setIsUserMenuOpen((prev) => !prev)
    }

    const handleLogout = () => {
        logout()
        setIsUserMenuOpen(false)
        setCurrentUser(null)
        navigate("/")
    }

    useEffect(() => {
        const updateUser = () => setCurrentUser(getCurrentUser())

        updateUser()
        window.addEventListener("auth:changed", updateUser)
        window.addEventListener("storage", updateUser)

        return () => {
            window.removeEventListener("auth:changed", updateUser)
            window.removeEventListener("storage", updateUser)
        }
    }, [])

    return (
        <>
            <header className="app-header">
                <NavLink className="logo" to="/">
                    <img className="logo-icon" alt="Лого" src="/logo.png" />
                    <span>OpOphtolmology</span>
                </NavLink>
                <nav className="nav">
                    <NavLink to="/">ImageBank</NavLink>
                    <NavLink to="/">Обучение</NavLink>
                    <NavLink to="/analysis">Обработка фото</NavLink>
                    <NavLink to="/">Консультация</NavLink>
                </nav>
                <div
                    className="user-avatar"
                    title="Профиль пользователя"
                    onClick={handleUserAvatarClick}
                >
                    <img src="/images/account_circle.png" alt="" />
                    <div className={`user-menu ${isUserMenuOpen ? 'user-menu--open' : ''}`}>
                        {currentUser ? (
                            <>
                                <div className="user-menu__item user-menu__item--readonly">
                                    {currentUser.username}
                                </div>
                                <button
                                    type="button"
                                    className="user-menu__item user-menu__item--action"
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="user-menu__item" to="/login">Войти</Link>
                                <Link className="user-menu__item" to="/register">Регистрация</Link>
                            </>
                        )}
                    </div>
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