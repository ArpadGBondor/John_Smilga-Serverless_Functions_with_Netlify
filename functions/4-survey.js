require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table('survey');

exports.handler = async (event, context, callback) => {
  const notSupportedMethod = {
    statusCode: 405,
    body: 'ERROR-405: Method Not Allowed.',
  };

  if (event.httpMethod === 'GET') {
    return await getRequest(event, context, callback);
  } else if (event.httpMethod === 'POST') {
    return notSupportedMethod;
  } else if (event.httpMethod === 'PUT') {
    return await putRequest(event, context, callback);
  } else if (event.httpMethod === 'DELETE') {
    return notSupportedMethod;
  } else {
    return notSupportedMethod;
  }
};

async function getRequest(event, context, callback) {
  try {
    const { records } = await airtable.list();
    const survey = records.map((product) => {
      const { id } = product;
      const { room, votes } = product.fields;
      return { id, room, votes };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(survey),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }
}

async function putRequest(event, context, callback) {
  try {
    const { increase_id } = JSON.parse(event.body);
    if (increase_id) {
      await increaseVote(increase_id);

      const {
        fields: { room, votes },
      } = await airtable.retrieve(increase_id);
      return {
        statusCode: 200,
        body: JSON.stringify({ increase_id, room, votes }),
      };
    }
    return {
      statusCode: 400,
      body: 'ERROR-400: Bad Request',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }
}

async function increaseVote(id) {
  const {
    fields: { votes },
  } = await airtable.retrieve(id);
  return await airtable.update(id, { votes: votes + 1 });
}
