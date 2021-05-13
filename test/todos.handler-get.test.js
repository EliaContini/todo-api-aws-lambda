/**
 * @module todos.handler-get.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for handler module: get and getById functions
 *
 */

"use strict";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { test } = require("tap");

const mongoServer = new MongoMemoryServer();
mongoose.Promise = Promise;

const AWS_LAMBDA_CONTEXT_STUB = {};

test("", async (t) => {
   return mongoServer.getUri().then((mongoUri) => {
      process.env.MONGODB_URI = mongoUri;

      const { create, get, getById } = require("./../todos/handler");

      t.test("Get todos", async (t) => {
         const response = await get(
            { queryStringParameters: null },
            AWS_LAMBDA_CONTEXT_STUB
         );

         const responseExpected = {
            headers: {
               "content-type": "application/json",
            },
            statusCode: 200,
            body: "[]",
         };

         t.same(response, responseExpected, "returns []");
      });

      t.test("Get todo by ID", async (t) => {
         const responseCreate = await create(
            {
               body: JSON.stringify({
                  text: "Test create",
               }),
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         const response = await getById(
            {
               pathParameters: {
                  id: JSON.parse(responseCreate.body)._id,
               },
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         t.same(response.statusCode, 200, "returns status code 200");
      });

      t.test("Get a not existing todo by ID", async (t) => {
         const response = await getById(
            {
               pathParameters: {
                  id: "000000000000000000000000",
               },
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         t.same(response.statusCode, 404, "returns status code 404");
      });

      t.teardown(async () => {
         mongoose.connection.close();
         mongoServer.stop();
      });
   });
});
