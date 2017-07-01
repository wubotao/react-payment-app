/* eslint-disable react/prop-types */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  ButtonToolbar,
  Row,
  Col
} from 'react-bootstrap';
import normalizeNumber from './normalizeNumber';
import normalizeCvv from './normalizeCvv';
import normalizeDate from './normalizeDate';
import { getCardType } from '../../utils/Card';

const checkExpiryDate = val => {
  const reg = /^(0?[1-9]|1[0-2])\s?\/\s?20([0-9]{2})$/;
  return reg.test(val);
};

const checkNumber = (number) => {
  const reg = /^\d+(\.\d{1,2}[0]*)?$/;
  return reg.test(number);
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 30) {
    errors.firstName = 'Must be 30 characters or less';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 30) {
    errors.lastName = 'Must be 30 characters or less';
  }
  if (!values.phone) {
    errors.phone = 'Required';
  }
  if (!values.amount) {
    errors.amount = 'Required';
  } else if (!checkNumber(values.amount)) {
    errors.amount = 'Invalid amount';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  }
  if (!values.number) {
    errors.number = 'Required';
  } else if (getCardType(values.number) === null) {
    errors.number = 'Invalid card';
  }
  if (!values.cvv) {
    errors.cvv = 'Required';
  } else if (values.cvv.length < 3) {
    errors.cvv = 'Must be 3 numbers';
  }
  if (!values.expiryDate) {
    errors.expiryDate = 'Required';
  } else if (!checkExpiryDate(values.expiryDate)) {
    errors.expiryDate = 'Invalid date';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup
    controlId={input.name}
    validationState={error && touched ? 'error' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} placeholder={label} type={type}/>
    {touched && error && <div className="text-danger">{error}</div>}
  </FormGroup>
);

const renderSelect = ({ input, label, children, meta: { touched, error } }) => (
  <FormGroup
    controlId={input.name}
    validationState={error && touched ? 'error' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...input}>
      {children}
    </FormControl>
    {touched && error && <div className="text-danger">{error}</div>}
  </FormGroup>
);

const PaymentForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col xs={12} md={6}>
          <Field name="firstName" type="text" component={renderField} label="First Name"/>
        </Col>
        <Col xs={12} md={6}>
          <Field name="lastName" type="text" component={renderField} label="Last Name"/>
        </Col>
      </Row>
      <Field name="phone" type="tel" component={renderField} label="Phone Number"/>
      <Row>
        <Col xs={12} md={6}>
          <Field name="amount" type="number" component={renderField} label="Amount"/>
        </Col>
        <Col xs={12} md={6}>
          <Field name="currency" component={renderSelect} label="Currency">
            <option value=""></option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AUD">AUD</option>
          </Field>
        </Col>
      </Row>
      <Field
        name="number"
        type="tel"
        component={renderField}
        label="Card Number"
        normalize={normalizeNumber}
      />
      <Field
        name="cvv"
        type="tel"
        component={renderField}
        label="CVV"
        normalize={normalizeCvv}
      />
      <Field
        name="expiryDate"
        type="tel"
        component={renderField}
        label="Expiry Date"
        normalize={normalizeDate}
      />
      <ButtonToolbar>
        <Button bsStyle="primary" type="submit" disabled={submitting}>
          {submitting ? <i /> : <i />} Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default reduxForm({
  form: 'payment',
  validate
})(PaymentForm);
