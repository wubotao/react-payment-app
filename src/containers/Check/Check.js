import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import serialize from 'serialize-javascript';
import * as ActionCreators from '../../actions/check';
import {
  CheckForm,
} from '../../components';

@connect(
  state => ({
    forms: state.async.forms,
    formsState: state.async.loadState && state.async.loadState.forms
  }),
  ActionCreators
)
class Check extends Component {//eslint-disable-line
  static propTypes = {
    forms: PropTypes.any,
    formsState: PropTypes.any,
    post: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Check.scss');
    const { forms, formsState, post } = this.props;
    return (
      <div className={styles.forms}>
        <Helmet title="Check"/>
        <Grid>
          <Row>
            <Col xs={12} md={6} mdOffset={3}>
              <Row>
                <Col xs={12} md={12}>
                  <h4>Check Form</h4>
                  <CheckForm onSubmit={post}/>
                </Col>
              </Row>
              <br/><br/>
              <Row className="container-fluid">
                表单提交后的响应结果：
                <pre>{serialize(forms, { space: 2 })}</pre>
                <br/><br/>
                表单提交后的响应状态：
                <pre>{serialize(formsState, { space: 2 })}</pre>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default Check;
