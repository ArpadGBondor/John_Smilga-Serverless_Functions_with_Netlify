require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: 'ERROR-405: Method Not Allowed.',
  };

  if (event.httpMethod === 'GET') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'POST') {
    return await handlePostRequest(event, context, callback);
  } else if (event.httpMethod === 'PUT') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'DELETE') {
    return notSupportedMethod;
  } else {
    return notSupportedMethod;
  }
};

async function handlePostRequest(event, context, callback) {
  const { email } = JSON.parse(event.body);
  if (!email) {
    return {
      statusCode: 400,
      body: 'ERROR-400: Please provide an e-mail address.',
    };
  }
  try {
    await axios.post(
      'https://api.buttondown.email/v1/subscribers',
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        },
      }
    );

    return {
      statusCode: 201,
      body: 'Successfully subscribed.',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: 'ERROR-400: Invalid e-mail address, or already subscribed.',
    };
  }
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}
