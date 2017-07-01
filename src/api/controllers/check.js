import { getConnection } from '../../utils/Env';
import redis from 'redis';

export default app => {
  app.get('/check', (req, res) => {
    const body = req.body;
    body.submitTime = new Date;
    const { firstName, lastName, paymentId } = body;
    const client = redis.createClient();
    client.on('error', (err) => {
      console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
    });
    const recordId = `${firstName}-${lastName}-${paymentId}`;

    client.get(recordId, (err, reply) => {
      if (reply === null) {
        const connection = getConnection();
        connection.connect();
        const sql = `SELECT * FROM record WHERE first_name = ?
          AND last_name = ? AND payment_id= ?`;
        connection.query(sql, [firstName, lastName, paymentId], (error, results) => {
          if (error) throw error;
          if (results.length > 0) {
            const data = results[0];
            const record = {
              firstName,
              lastName,
              paymentId,
              phone: data.phone,
              amount: data.amount,
              currency: data.currency,
              createTime: data.create_time
            };
            client.set(recordId, JSON.stringify(record), redis.print);
            res.json({
              size: 1,
              record
            });
          } else {
            res.json({
              size: 0
            });
          }
        });
      } else {
        res.json({
          size: 1,
          record: JSON.parse(reply)
        });
      }
    });
  });
};
