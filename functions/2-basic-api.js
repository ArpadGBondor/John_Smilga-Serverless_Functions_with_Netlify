const data = require('../assets/data');

exports.handler = async (event, context) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*', // 'CORS' (Cross-Origin Resource Sharing) error fix
    },
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
