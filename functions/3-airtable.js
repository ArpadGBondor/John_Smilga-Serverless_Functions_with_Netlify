require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table('products');

exports.handler = async (event, context) => {
  try {
    const { id } = event.queryStringParameters;
    if (id) {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      const { name, image, price, description } = product.fields;
      const url = image[0].url;

      return {
        statusCode: 200,
        body: JSON.stringify({ name, url, price, description }),
      };
    } else {
      const { records } = await airtable.list();

      const products = records.map((product) => {
        const { id } = product;
        const { name, image, price } = product.fields;
        const url = image[0].url;
        return { id, name, url, price };
      });
      return {
        statusCode: 200,
        body: JSON.stringify(products),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }
};
