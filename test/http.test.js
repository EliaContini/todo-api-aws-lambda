/**
 * @module http.test
 *
 * @author Elia Contini <https://elia.contini.page/>
 *
 * @description Test for http module
 *
 */

"use strict";

const { test } = require("tap");

const { response } = require("./../http");

test("Some content", async (t) => {
   const result = response("Some content", 200);

   const expected = {
      body: '"Some content"',
      headers: { "content-type": "application/json" },
      statusCode: 200,
   };

   t.same(result, expected, "status 200 and content-type application/json");
});

test("no content (null)", async (t) => {
   const result = response(null, 204);

   const expected = {
      headers: { "content-type": "application/json" },
      statusCode: 204,
   };

   t.same(result, expected, "status 204 and content-type application/json");
});
