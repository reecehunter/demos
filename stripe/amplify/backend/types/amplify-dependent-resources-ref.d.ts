export type AmplifyDependentResourcesAttributes = {
  "api": {
    "stripeAPI": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "stripeLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "webhookLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}