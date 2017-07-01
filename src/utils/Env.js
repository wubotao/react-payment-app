import env from 'dotenv';
import mysql from 'mysql';

export const getEnv = currency => {
  env.load();
  let client;
  let secret;
  switch (currency) {
    case 'USD':
      client = process.env.PP_USD_CLIENT_ID;
      secret = process.env.PP_USD_CLIENT_SECRET;
      break;
    case 'EUR':
      client = process.env.PP_EUR_CLIENT_ID;
      secret = process.env.PP_EUR_CLIENT_SECRET;
      break;
    case 'AUD':
      client = process.env.PP_AUD_CLIENT_ID;
      secret = process.env.PP_AUD_CLIENT_SECRET;
      break;
    default:
      break;
  }
  return {
    client,
    secret
  };
};

export const getConnection = () => {
  env.load();
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};
