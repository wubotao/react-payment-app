import paypal from 'paypal-rest-sdk';
import { getCardType } from '../../utils/Card';
import { getEnv, getConnection } from '../../utils/Env';
import redis from 'redis';

export default app => {
  app.post('/payment', (req, res) => {
    const body = req.body;
    body.submitTime = new Date;
    const { number, expiryDate, currency, cvv, firstName, lastName, amount, phone } = body;
    const num = body.number.replace(/\s/g, '');
    const type = getCardType(number);
    const exp = expiryDate.split('/');
    const year = exp[1].trim();
    const month = exp[0].trim();
    const { client, secret } = getEnv(currency);
    paypal.configure({
      mode: 'sandbox',
      client_id: client,
      client_secret: secret
    });

    const payment = {
      intent: 'sale',
      payer: {
        payment_method: 'credit_card',
        funding_instruments: [{
          credit_card: {
            number: num,
            type,
            expire_month: month,
            expire_year: year,
            cvv2: cvv,
            first_name: firstName,
            last_name: lastName
          }
        }]
      },
      transactions: [{
        amount: {
          total: amount,
          currency
        },
        description: ''
      }]
    };

    const connection = getConnection();
    connection.connect();
    const redisClient = redis.createClient();
    const record = {
      first_name: firstName,
      last_name: lastName,
      phone,
      amount,
      currency,
      payment_type: 1,
      create_time: body.submitTime
    };

    paypal.payment.create(payment, (error, result) => {
      if (error) {
        record.error = error.message;
        record.status = 0;
        connection.query('INSERT INTO record SET ?', record, (err) => {
          if (err) throw err;
        });
        res.status(500).end();
      } else {
        record.payment_id = result.id;
        record.status = 1;
        connection.query('INSERT INTO record SET ?', record, (err) => {
          if (err) throw err;
        });

        // Add record to redis
        const recId = `${firstName}-${lastName}-${result.id}`;
        const rec = {
          firstName,
          lastName,
          paymentId: result.id,
          phone,
          amount,
          currency,
          createTime: body.submitTime
        };
        redisClient.set(recId, JSON.stringify(rec), redis.print);

        res.json({
          id: result.id,
          total: amount,
          currency,
          create_time: result.create_time,
        });
      }
    });
  });
};

