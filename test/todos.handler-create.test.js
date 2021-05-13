/**
 * @module todos.handler-create.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for handler module: create funciton
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

      const { create } = require("./../todos/handler");

      t.test("Create a todo", async (t) => {
         const response = await create(
            {
               body: JSON.stringify({
                  text: "Test create",
               }),
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         t.same(response.statusCode, 201, "returns status code 201");
      });

      t.teardown(async () => {
         mongoose.connection.close();
         mongoServer.stop();
      });
   });
});
