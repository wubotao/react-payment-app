import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <Jumbotron>
          <div className="container">
            <h1>Homepage</h1>
          </div>
        </Jumbotron>
        <div className="container">
          <div>
            <h2 id="payment">Payment</h2>
            <p>
              This is a payment sample implemented by Node.js.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
