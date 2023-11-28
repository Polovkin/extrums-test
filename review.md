review file url path: https://github.com/sacden/employee-list/blob/main/server/controllers/Controller.js

1. Use typescript instead of js. ;)
2. Class naming. Looks like this class something like response\request utils. So, it should be named like `ResponseUtils` or `ResponseHelper` or something like this.
3. All methods are static and there is no any instance of this class. So, it should be `static` class or singleton.
4. sendResponse like a "god" method. We try to check a lot of payload types and variants. 
5. sendError - error sender. I think it should be better to create application error class sender to use in middlewares
6. Method collectFile has no error handling when we use fs module. It should be better to use fs.promises and try/catch block.
7. Is not clear for me what getRequestBodyName does. 
8. We may use ? operator to check  `request.openapi.schema.requestBody !== undefined` like `request.openapi.schema.requestBody?.content['application/json']?.schema?.properties` and create some vars to make code more readable.
9. In line 93 better use switch/case instead of if/else.
