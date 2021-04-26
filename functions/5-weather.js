require('dotenv').config();
const axios = require('axios');

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: 'ERROR-405: Method Not Allowed.',
  };

  if (event.httpMethod === 'GET') {
    // We are requesting data from the Open Weather API. This should be a get request.
    return await handleGetRequest(event, context, callback);
  } else if (event.httpMethod === 'POST') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'PUT') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'DELETE') {
    return notSupportedMethod;
  } else {
    return notSupportedMethod;
  }
};

async function handleGetRequest(event, context, callback) {
  // Get requests doesn't have meaninful body, so the city name was passed as query parameter
  const { city } = event.queryStringParameters;
  try {
    const appID = process.env.OPEN_WEATHER_API_KEY;
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}&units=${units}`;
    const { data } = await axios(url);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        statusCode: 404,
        body: 'ERROR-404: City Not Found',
      };
    } else {
      return {
        statusCode: 500,
        body: 'ERROR-500: Server Error.',
      };
    }
  }
}
