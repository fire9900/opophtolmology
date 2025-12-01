import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/authService'
import '../assets/styles/pages/auth.scss'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    login: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        username: form.login,
        password: form.password,
      })
      navigate('/login')
    } catch (err) {
      setError(err.message ?? 'Не удалось создать аккаунт')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth auth--register">
      <div className="auth__card">
        <h1 className="auth__title">Создать аккаунт</h1>
        <p className="auth__subtitle">Заполните данные, чтобы начать работу</p>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__label">
            <span>Логин</span>
            <input
              className="auth__input"
              type="text"
              name="login"
              required
              value={form.login}
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
              value={form.password}
              onChange={handleChange}
            />
          </label>

          <label className="auth__label">
            <span>Повторите пароль</span>
            <input
              className="auth__input"
              type="password"
              name="confirmPassword"
              required
              minLength={6}
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </label>

          {error && <p className="auth__status auth__status--error">{error}</p>}

          <button className="auth__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Создаём...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth__hint">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage

