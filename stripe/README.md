# Stripe Demo
> A demonstration of how to use Stripe and AWS Lambda functions to create a fully scalable payment processing method.

## Technologies
- AWS Amplify
- AWS Lambda
- Stripe
- React
- TypeScript
- NodeJS

## How it works
1. When the demo page is loaded, it queries the "/stripe/create-payment-intent" endpoint, running on a serverless AWS Lambda function, to create a payment intent with Stripe, which returns a client secret.

2. The client secret is then used to create a Stripe Elements form that is used to collect the payment information.

3. When you submit the payment, the information is automatically sent to Stripe, where Stripe processes it and triggers a webhook.

4. The webhook triggers our "/webhook/stripe" endpoint, which is also running as a serverless AWS Lambda function, which can then be used to perform any actions needed after the payment is processed.