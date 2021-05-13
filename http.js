/**
 * Utility module for http
 *
 * Author: Elia Contini <https://elia.contini.page/>
 *
 */

"use strict";

const CONTENT_TYPE = "application/json";

const response = (content, statusCode) => {
   let response = {
      headers: { "content-type": CONTENT_TYPE },
      statusCode: statusCode,
   };

   if (content) {
      response.body = JSON.stringify(content);
   }

   return response;
};

module.exports = {
   response: response,
};
