/**
 * Handler for todos functions
 *
 * Author: Elia Contini <https://elia.contini.page/>
 *
 */

"use strict";

const database = require("./../database");
const queryStringParser = require("./../queryStringParser");
const { response } = require("./../http");

const db = database(process.env.MONGODB_URI);

module.exports.create = async (event, context) => {
   //
   // TODO: input must be sanitized
   //
   const todo = JSON.parse(event.body);

   const saved = await db.create(todo);

   return response(saved, 201);
};

module.exports.get = async (event, context) => {
   const params = queryStringParser(event.queryStringParameters);

   const todos = await db.get(params);

   return response(todos, 200);
};

module.exports.getById = async (event, context) => {
   const todoId = event.pathParameters.id;

   const todo = await db.get({ id: todoId });

   if (todo == null) {
      return response({ message: `Todo with id ${todoId} not found` }, 404);
   }

   return response(todo, 200);
};

module.exports.remove = async (event, context) => {
   const todoId = event.pathParameters.id;

   const removed = await db.remove(todoId);

   return response(null, 204);
};

module.exports.update = async (event, context) => {
   //
   // TODO: input must be sanitized
   //
   const todo = JSON.parse(event.body);

   const updated = await db.update(todo);

   if (updated == null) {
      return response({ message: `Todo with id ${todo._id} not found` }, 404);
   }

   return response(updated, 200);
};
