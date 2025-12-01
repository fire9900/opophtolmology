import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import '../assets/styles/pages/auth.scss'

const LoginPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(form)
      navigate('/')
    } catch (err) {
      setError(err.message ?? 'Не удалось авторизоваться')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth auth--login">
      <div className="auth__card">
        <h1 className="auth__title">Войти в аккаунт</h1>
        <p className="auth__subtitle">Введите логин и пароль</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__label">
            <span>Логин</span>
            <input
              className="auth__input"
              type="text"
              name="username"
              required
              placeholder="Введите логин"
              value={form.username}
              onChange={handleChange}
            />
          </label>

          <label className="auth__label">
            <span>Пароль</span>
            <input
              className="auth__input"
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </label>

          {error && <p className="auth__status auth__status--error">{error}</p>}

          <button className="auth__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="auth__hint">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage

