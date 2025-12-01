import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import "./assets/styles/app.scss"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
            </Routes>
        </>
    )
}

export default App
