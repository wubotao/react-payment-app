
/**
 *
 * Author : Tony Wu <mail@taotao.io>
 * Date   : 2017-07-01
 * Copyright (c) 2017. All rights reserved.
 */

import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import payment from '../../src/api/controllers/payment';

require('should');
const app = express();
app.use(bodyParser.json());
payment(app);

const data = {
  firstName: 'Tony',
  lastName: 'Wu',
  number: '4111 1111 1111 1111',
  expiryDate: '11 / 2022',
  currency: 'USD',
  cvv: '123',
  amount: '15.00',
  phone: '13571000'
};

describe('APIs', function () {
  this.timeout(60000);

  it('POST /payment', (done) => {
    request(app).post('/payment')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.id.should.be.a.String();
        res.body.total.should.be.eql('15.00');
        done();
      });
  });
});
