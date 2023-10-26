import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const PaymentPage = () => {
  const [stripe, setStripe] = useState<Object | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const fetchStripe = () => {
    console.log(loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY))
  }

  const createPaymentIntent = () => {
    axios.post<{clientSecret: string}>(`${import.meta.env.VITE_STRIPE_API_URL}/stripe/create-payment-intent`)
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
      .catch(err => {
          console.error(err)
          setErrors([...errors, 'Invalid developer key.'])
      })
  }

  useEffect(() => {
    fetchStripe()
    createPaymentIntent()
  }, [])

  useEffect(() => {

  })

  return (
    <Container sx={{ my: 10 }} maxWidth="sm">
      <Typography component='h1' variant="h3">
        Test Payment - $10
      </Typography>
    </Container>
  )
}

export default PaymentPage