import { MouseEvent, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Alert, Container } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SpinnerCallback from './SpinnerCallback'

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    async function handleSubmit(event: MouseEvent) {
        event.preventDefault()
        if(!stripe || !elements) return
        setProcessing(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            }
        })
        if(error) setMessage(error.message || '')
        setProcessing(false)
    }

    return (
        <Container maxWidth='sm'>
            <SpinnerCallback isLoaded={!!(stripe && elements)}>
                {message ?
                    <Alert sx={{ my: 3 }} severity="error">
                        {message}
                    </Alert>
                : ''}
                <PaymentElement />
                <LoadingButton sx={{ mt: 3 }} onClick={handleSubmit} startIcon={<CreditCardIcon />} loading={processing} loadingPosition='start' variant='contained' fullWidth>
                    Pay Now
                </LoadingButton>
            </SpinnerCallback>
        </Container>
    )
}

export default CheckoutForm