import { useEffect, useState } from 'react'
import { Alert, Box, Container, Typography } from '@mui/material'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios, { AxiosError } from 'axios'
import SpinnerCallback from '../components/SpinnerCallback'
import CheckoutForm from '../components/CheckoutForm'

const PaymentPage = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  const fetchStripe = async () => {
    setStripe(await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY))
  }

  const createPaymentIntent = () => {
    axios.post<{clientSecret: string}>(`${import.meta.env.VITE_STRIPE_API_URL}/stripe/create-payment-intent`)
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
      .catch((err: AxiosError) => {
          console.error(err)
          setErrors([...errors, (err.response?.data as { message: string } | undefined)?.message || 'An error occurred.'])
      })
  }

  useEffect(() => {
    fetchStripe()
    createPaymentIntent()
  }, [])

  return (
    <Container sx={{ my: 10 }} maxWidth='sm'>
      <Typography sx={{ textAlign: 'center' }} component='h1' variant='h3'>
        Test Payment
      </Typography>
      {errors.map((error, index) => (
        <Alert sx={{ my: 2 }} key={index} severity='error'>
          {error}
        </Alert>
      ))}
      <SpinnerCallback isLoaded={!!(stripe && clientSecret)}>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ textAlign: 'center' }} variant='body1' color='gray'>
            Test Card Info: 4242 4242 4242 4242
          </Typography>
          <Typography sx={{ textAlign: 'center' }} variant='body1' color='gray'>
            Expiration: 42/42
          </Typography>
          <Typography sx={{ textAlign: 'center' }} variant='body1' color='gray'>
            CVC: 424
          </Typography>
          <Typography sx={{ textAlign: 'center' }} variant='body1' color='gray'>
            ZIP: 42424
          </Typography>
        </Box>
        <Elements stripe={stripe} options={{ clientSecret: clientSecret ?? undefined }}>
          <CheckoutForm />
        </Elements>
      </SpinnerCallback>
    </Container>
  )
}

export default PaymentPage