import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import { Spin } from '../../components';
import config from '../../config';

@connect(
  state => ({ user: state.async.user }),
)
class Main extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.any,
  };

  render() {
    require('./Main.scss');
    return (
      <div>
        <Helmet {...config.app.head}/>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer to="/payment">
                <NavItem eventKey={3}>Payment</NavItem>
              </LinkContainer>
              <LinkContainer to="/check">
                <NavItem eventKey={3}>Check</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Spin />

        <div>
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

export default Main;
