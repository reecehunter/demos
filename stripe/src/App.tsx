import { Route, Routes } from 'react-router-dom'
import PaymentPage from './pages/PaymentPage'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pay' element={<PaymentPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
