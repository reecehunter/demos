import { Route, Routes } from 'react-router-dom'
import PaymentPage from './pages/PaymentPage'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/checkout' element={<PaymentPage />} />
      <Route path='/checkout/success' element={<SuccessPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
