require('dotenv').config();
const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 132, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

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
  const { name, email, subject, message } = JSON.parse(event.body);

  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'ERROR-400: Please Provide All Values.',
    };
  }

  const data = {
    from: 'John Doe <learncodingtutorial@gmail.com>',
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}</p>`,
  };

  try {
    await transporter.sendMail({ ...data });
    return {
      statusCode: 200,
      body: 'Email sent.',
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'ERROR-500: Server Error.',
    };
  }
  //Just in case I forgot to return something somewhere...
  return {
    statusCode: 500,
    body: 'ERROR-500: Server Error.',
  };
}
