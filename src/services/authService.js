const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'
const AUTH_ENDPOINT = `${API_BASE_URL.replace(/\/$/, '')}/auth`

async function request(path, body) {
  const response = await fetch(`${AUTH_ENDPOINT}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.message ?? 'Ошибка запроса'
    throw new Error(message)
  }

  return data
}

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth:changed'))
  }
}

function persistToken(token) {
  if (token) {
    localStorage.setItem('accessToken', token)
  } else {
    localStorage.removeItem('accessToken')
  }
  notifyAuthChange()
}

export async function login({ username, password }) {
  const data = await request('/sign-in', { username, password })
  if (!data?.accessToken) {
    throw new Error('Токен не получен от сервера')
  }
  persistToken(data.accessToken)
  return data
}

export async function register(payload) {
  const data = await request('/sign-up', payload)
  if (data?.token) {
    persistToken(data.token)
  }
  return data
}

export function logout() {
  persistToken(null)
}

export function getToken() {
  return localStorage.getItem('accessToken')
}

function decodePayload(token) {
  try {
    const [, payload] = token.split('.')
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(normalized)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to decode token', error)
    return null
  }
}

export function getCurrentUser() {
  const token = getToken()
  if (!token) {
    return null
  }

  const payload = decodePayload(token)
  if (!payload) {
    logout()
    return null
  }

  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : false
  if (isExpired) {
    logout()
    return null
  }

  return {
    username: payload.username ?? payload.sub ?? 'Пользователь',
  }
}

