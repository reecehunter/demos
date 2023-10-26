/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})


/**********************
 * Routes             *
 **********************/

app.post('/webhook/stripe', async (req, res) => {
  // Catch incorrect event type.
  if(req.body.type !== 'payment_intent.succeeded') return res.status(500).json({ message: 'Not handling this event type.' })

  // Verify the event with the Stripe webhook signing key.
  const stripeSignature = req.headers['stripe-signature']
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const event = stripe.webhooks.constructEvent(req.rawBody, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET)
    if(event.type !== 'payment_intent.succeeded') return res.status(500).json({ message: 'Invalid event type.' })
    // Return the result.
    return res.status(200).json({ message: 'Payment intent succeeded.' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to verify webhook signature.', err })
  }
})

/**********************
 * Start the server   *
 **********************/

app.listen(3000, function() {
    console.log("App started")
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
