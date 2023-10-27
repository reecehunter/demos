import { CreditCard } from '@mui/icons-material'
import { Container, Button, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Container sx={{ my: 10 }} maxWidth='sm'>
      <Typography sx={{ textAlign: 'center' }} component='h1' variant='h3'>
        Stripe Payments Demo
      </Typography>
      <Button sx={{ my: 2 }} startIcon={<CreditCard />} variant='contained' onClick={() => navigate('/checkout')} fullWidth>
        Start Demo
      </Button>
      <Box sx={{ my: 5 }}>
        <Typography component='h2' variant='h4' gutterBottom>
          Technologies
        </Typography>
        <Typography sx={{ mb: 4 }} variant='body1'>
          AWS Amplify, AWS Lambda, Stripe, React, TypeScript, NodeJS.
        </Typography>
        <Typography component='h2' variant='h4' gutterBottom>
          How it works
        </Typography>
        <Typography sx={{ mb: 2 }} variant='body1'>
          When the demo page is loaded, it queries the "/stripe/create-payment-intent"
          endpoint, running on a serverless AWS Lambda function, to create a payment intent with Stripe, which returns a client secret.
        </Typography>
        <Typography sx={{ mb: 2 }} variant='body1'>
          The client secret is then used to create a Stripe Elements form that is used to collect the payment information.
        </Typography>
        <Typography sx={{ mb: 2 }} variant='body1'>
          When you submit the payment, the information is automatically sent to Stripe, where Stripe processes it and triggers a webhook.
        </Typography>
        <Typography variant='body1'>
          The webhook triggers our "/webhook/stripe" endpoint, which is also running as a serverless AWS Lambda function,
          which can then be used to perform any actions needed after the payment is processed.
        </Typography>
      </Box>
    </Container>
  )
}

export default HomePage