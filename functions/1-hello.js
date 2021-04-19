// http://localhost:8888/.netlify/functions/1-hello

// 1. async Hello World
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: 'Hello World! Have a nice day!',
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
