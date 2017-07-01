/**
 *
 * Author : Tony Wu <mail@taotao.io>
 * Date   : 2017-07-01
 * Copyright (c) 2017. All rights reserved.
 */

import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import check from '../../src/api/controllers/check';

require('should')
const app = express();
app.use(bodyParser.json());
check(app);

const data = {
  firstName: 'Tony',
  lastName: 'Wu',
  paymentId: 'payment-id-1001',
};

describe('APIs', function () {
  this.timeout(10000);

  it('GET /check', (done) => {
    request(app).get('/check')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.body.size.should.be.eql(0);
        done();
      });
  });
});

