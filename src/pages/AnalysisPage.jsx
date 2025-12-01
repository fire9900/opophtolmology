import { useState } from 'react'
import { uploadForPrediction } from '../services/predictService'
import '../assets/styles/pages/analysis.scss'

const AnalysisPage = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [resultMessage, setResultMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const predictions = {
    "cataract": "Катаракта",
    "diabetic_retinopathy": "Диабетическая ретинопатия",
    "glaucoma": "Глаукома",
    "normal": "Отклонений не выявлено",
  }

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

      const message = predictionMessages[prediction] ?? `Результат: ${predictions[prediction]}`
      setResultMessage(message)
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

const predictionMessages = {
  normal: 'Снимок в норме. Патологии не выявлены.',
  anomaly: 'Обнаружены признаки патологии. Требуется консультация специалиста.',
}

