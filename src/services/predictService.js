import { getToken } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'
const PREDICT_ENDPOINT = `${API_BASE_URL.replace(/\/$/, '')}/api/predict`
const ATTEMPTS_ENDPOINT = `${PREDICT_ENDPOINT}/attempts`

export async function uploadForPrediction(file) {
  if (!file) {
    throw new Error('Выберите файл изображения')
  }

  const formData = new FormData()
  formData.append('file', file)

  const headers = {}
  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(PREDICT_ENDPOINT, {
    method: 'POST',
    headers,
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.message ?? 'Не удалось получить результат'
    throw new Error(message)
  }

  return data
}

export async function getPredictionAttempts() {
  const headers = {}
  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(ATTEMPTS_ENDPOINT, {
    method: 'GET',
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.message ?? 'Не удалось получить количество попыток'
    throw new Error(message)
  }

  return data
}

