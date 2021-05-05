// http://localhost:8888/.netlify/functions/1-hello

// 1. async Hello World
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello world, have a nice day! 😀',
  };
};

// 2. not async Hello World
// exports.handler = (event, context, callback) => {
//   callback(null, { statusCode: 200, body: 'Our First Functions Example' });
// };

// 3. stringify an  object
// const person = { name: 'John' };
// exports.handler = async (event, context) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(person),
//   };
// };

// 4. Dummy code, checking the HTTP method:
// exports.handler = async (event, context, callback) => {
//   const notSupportedMethod = {
//     statusCode: 405,
//     body: 'ERROR-405: Method Not Allowed.',
//   };

//   if (event.httpMethod === 'GET') {
//     return await handleGetRequest(event, context, callback);
//   } else if (event.httpMethod === 'POST') {
//     return notSupportedMethod;
//   } else if (event.httpMethod === 'PUT') {
//     return notSupportedMethod;
//   } else if (event.httpMethod === 'DELETE') {
//     return notSupportedMethod;
//   } else {
//     return notSupportedMethod;
//   }
// };

// async function handleGetRequest(event, context, callback) {
//   // ...

//   return {
//     statusCode: 200,
//     body: 'Hello world, have a nice day! 😀',
//   };

//   // ...

//   //Just in case I forgot to return something somewhere, I send back server error
//   return {
//     statusCode: 500,
//     body: 'ERROR-500: Server Error.',
//   };
// }
