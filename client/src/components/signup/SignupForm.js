import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Form from '../common/form';

function validateInput(data) {
  let errors = {};
                        
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields : []
    }

  }

  componentWillMount(){
    this.props.getFields().then((res) => {
      this.setState({fields : res.data.fields});
    });
  }

  onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  }


  render() {
    let { fields } = this.state;
    return (

      <div className="App">
        <Form className="form"
          title = "Registration"
          fields = {fields}
          onSubmit = {(model) => {this.onSubmit(model)}} 
        />
      </div>
    );
  }
}

SignupForm.propTypes = {
  getFields: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;
