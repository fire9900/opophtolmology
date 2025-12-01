import { useState, useEffect, useCallback } from 'react'
import { uploadForPrediction, getPredictionAttempts } from '../services/predictService'
import '../assets/styles/pages/analysis.scss'

const AnalysisPage = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attempts, setAttempts] = useState(null)
  const [attemptsError, setAttemptsError] = useState('')
  const [isAttemptsLoading, setIsAttemptsLoading] = useState(true)

  const predictions = {
    cataract: 'Катаракта',
    diabetic_retinopathy: 'Диабетическая ретинопатия',
    glaucoma: 'Глаукома',
    normal: 'Отклонений не выявлено',
  }

  const fetchAttempts = useCallback(async () => {
    setAttemptsError('')
    setIsAttemptsLoading(true)
    try {
      const data = await getPredictionAttempts()
      const value = typeof data?.amount === 'number' ? data.amount : null
      setAttempts(value)
    } catch (err) {
      setAttemptsError(err.message ?? 'Не удалось получить количество попыток')
      setAttempts(null)
    } finally {
      setIsAttemptsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAttempts()
  }, [fetchAttempts])

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0]
    setFile(selected ?? null)
    setResultMessage('')
    setError('')

    if (selected) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result?.toString() ?? '')
      reader.readAsDataURL(selected)
    } else {
      setPreview('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setResultMessage('')

    if (!file) {
      setError('Выберите файл изображения')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await uploadForPrediction(file)
      const prediction = response?.prediction

      if (!prediction) {
        throw new Error('Сервер не вернул prediction')
      }

      const label = predictions[prediction] ?? prediction
      const message = `Результат: ${label}`
      setResultMessage(message)
      await fetchAttempts()
    } catch (err) {
      setError(err.message ?? 'Ошибка отправки файла')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="analysis">
      <div className="analysis__card">
        <div className="analysis__intro">
          <h1>Обработка изображения</h1>
          <p>Загрузите фото, чтобы получить предсказание модели.</p>
        </div>

        <div className="analysis__attempts">
          {isAttemptsLoading && 'Загружаем количество попыток...'}
          {!isAttemptsLoading && attempts !== null && (
            <span>Осталось попыток: {attempts}</span>
          )}
          {!isAttemptsLoading && attempts === null && (
            <span className="analysis__status analysis__status--error">
              {attemptsError || 'Не удалось получить количество попыток'}
            </span>
          )}
        </div>

        <form className="analysis__form" onSubmit={handleSubmit}>
          <label className="analysis__upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            <span>{file?.name ?? 'Перетащите файл или нажмите, чтобы выбрать'}</span>
          </label>

          {preview && (
            <div className="analysis__preview">
              <img src={preview} alt="Предпросмотр" />
            </div>
          )}

          {error && <p className="analysis__status analysis__status--error">{error}</p>}
          {resultMessage && (
            <p className="analysis__status analysis__status--success">{resultMessage}</p>
          )}

          <button className="analysis__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Отправить на анализ'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default AnalysisPage
