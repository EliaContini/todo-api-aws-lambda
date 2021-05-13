/**
 * @module todos.handler-update.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for handler module: update funciton
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

      const { create, update } = require("./../todos/handler");

      t.test("Update a todo", async (t) => {
         const responseCreate = await create(
            {
               body: JSON.stringify({
                  text: "Test create",
               }),
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         let todo = JSON.parse(responseCreate.body);
         todo.isCompleted = true;
         todo.text = todo.text + " [Updated]";

         const responseUpdate = await update({
            body: JSON.stringify(todo),
         });

         t.same(
            JSON.parse(responseUpdate.body).isCompleted,
            true,
            "returns a todo with prop isCompleted === true"
         );
      });

      t.test("Update a not existing todo", async (t) => {
         const responseCreate = await create(
            {
               body: JSON.stringify({
                  text: "Test create",
               }),
            },
            AWS_LAMBDA_CONTEXT_STUB
         );

         let todo = JSON.parse(responseCreate.body);
         todo._id = "000000000000000000000000"; // not existing ID

         const responseUpdate = await update({
            body: JSON.stringify(todo),
         });

         t.same(responseUpdate.statusCode, 404, "returns status code 404");
      });

      t.teardown(async () => {
         mongoose.connection.close();
         mongoServer.stop();
      });
   });
});
