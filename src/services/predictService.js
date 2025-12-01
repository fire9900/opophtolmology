import { getToken } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api'
const PREDICT_ENDPOINT = `${API_BASE_URL.replace(/\/$/, '')}/api/predict`

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

