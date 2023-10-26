import { CreditCard } from '@mui/icons-material'
import { Container, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Container sx={{ my: 10 }} maxWidth='sm'>
      <Typography component='h1' variant='h3'>
        Stripe Payments Demo
      </Typography>
      <Button sx={{ my: 2 }} startIcon={<CreditCard />} variant='contained' onClick={() => navigate('/checkout')}>
        Start Demo
      </Button>
      <Typography variant='body1'>
        Explain how each step of the process works.
      </Typography>
    </Container>
  )
}

export default HomePage