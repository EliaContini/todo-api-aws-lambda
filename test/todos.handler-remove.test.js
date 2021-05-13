/**
 * @module todos.handler-remove.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for handler module: remove funciton
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

      const { create, remove } = require("./../todos/handler");

      t.test("Remove a todo", async (t) => {
         const responseCreate = await create(
            {
               body: JSON.stringify({
                  text: "Test create",
               }),
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         const responseRemove = await remove({
            pathParameters: {
               id: responseCreate._id,
            },
         });

         t.same(responseRemove.statusCode, 204, "returns status code 204");
      });

      t.teardown(async () => {
         mongoose.connection.close();
         mongoServer.stop();
      });
   });
});
