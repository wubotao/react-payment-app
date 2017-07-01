/**
 *
 * Author : Tony Wu <mail@taotao.io>
 * Date   : 2017-07-01
 * Copyright (c) 2017. All rights reserved.
 */

import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import nock from 'nock';
import { Payment } from '../../src/containers';
import { post } from '../../src/actions/payment';
import configureStore from '../../src/utils/configureStore';
import config from '../../src/config';

const payment = {
  id: 'payment-id-1001',
  total: 12.00,
  currency: 'USD',
};

function setup(result = payment) {
  global.__SERVER__ = true;
  global.__COOKIE__ = null;
  nock('http://' + config.apiHost + ':' + config.apiPort)
    .post('/payment').reply(200, { result });

  const store = configureStore();
  return store.dispatch(post())
    .then(() => {
      const app = mount(
        <Provider store={store}>
          <Payment />
        </Provider>
      );
      return {
        buttons: app.find('button'),
        pre: app.find('pre').at(0)
      };
    });
}

describe('containers', () => {
  describe('Payment', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should display the payment result', () => setup()
      .then(({ pre }) => {
        expect(pre.text()).toMatch(/"id": "payment-id-1001/);
      }));
  });
});


