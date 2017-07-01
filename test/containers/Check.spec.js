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
import { Check } from '../../src/containers';
import { post } from '../../src/actions/check';
import configureStore from '../../src/utils/configureStore';
import config from '../../src/config';

const data = {
  size: 1,
  record: {
    firstName: 'Tony',
    lastName: 'Wu',
    paymentId: 'PAY-2HF15551JT037294JLFKSD5Q'
  }
};

function setup(result = data) {
  global.__SERVER__ = true;
  global.__COOKIE__ = null;
  nock('http://' + config.apiHost + ':' + config.apiPort)
    .get('/check').reply(200, { result });

  const store = configureStore();
  return store.dispatch(post())
    .then(() => {
      const app = mount(
        <Provider store={store}>
          <Check />
        </Provider>
      );
      return {
        buttons: app.find('button'),
        pre: app.find('pre').at(0)
      };
    });
}

describe('containers', () => {
  describe('Check', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should display no data result', () => setup({ size: 0 })
      .then(({ pre }) => {
        expect(pre.text()).toMatch(/"size": 0/);
      }));
    it('should display the check result', () => setup()
      .then(({ pre }) => {
        expect(pre.text()).toMatch(/"size": 1/);
      }));
  });
});

