require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

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
  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body);

  // console.log('PURCHASE: ');
  // console.log(purchase);
  // console.log('TOTAL AMOUNT: ');
  // console.log(total_amount);
  // console.log('SHIPPING FEE: ');
  // console.log(shipping_fee);

  // This function should calculate the total amount again.
  // Any false data can come from the front-end.
  //    // Replace this constant with a calculation of the order's amount
  //    // Calculate the order total on the server to prevent
  //    // people from directly manipulating the amount on the client
  const calculateOrderAmount = () => shipping_fee + total_amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: 'gbp',
    });

    // console.log('paymentIntent');
    // console.log(paymentIntent);

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
  //Just in case I forgot to return something somewhere...
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}
