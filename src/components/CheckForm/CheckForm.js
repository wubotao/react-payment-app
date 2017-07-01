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
  if (!values.paymentId) {
    errors.paymentId = 'Required';
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
      <Field name="paymentId" type="tel" component={renderField} label="Payment ID"/>
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
