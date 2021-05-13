# A simple REST API to manage todos using MongoDB, Serverless Framework and AWS Lambda

This solution uses [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [Serverless Framework](https://www.serverless.com/) and it is configured to be deployed on [AWS Lambda](https://aws.amazon.com/lambda/).

## Install dependencies

    $ npm install

## Configure Serveless Framework and set MongoDB URI

Use `sample.serverless.json` as template

```
$ cp sample.serverless.json serverless.json
```

Open `serverless.json` with an editor and set `provider.environment.MONGODB_URI`
with your MongoDB Atlas URI.

You can even change the region where the solution is deployed editing `provider.region`.

## Deploy on AWS Lambda

    $ serverless deploy -v

## Run the tests

    $ npm test

## Postman collection

In this repository is available a [Postman collection](todo-rest-api-aws-lambda.postman_collection.json) that can be used to perform manual functional tests.

**IMPORTANT** Rember to set the proper `aws_lambda_url` variable value.
