import React from 'react';
import SignupForm from '../../components/signup/SignupForm';
import { connect } from 'react-redux';
import { getFields } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages.js';
import PropTypes from 'prop-types';

class SignupPage extends React.Component {
  render() {
    const { getFields, addFlashMessage } = this.props;
    return (
      <div className="row" style={{margin:'0px 0px 50px 0px'}}>
        <div className="col-md-6 col-md-offset-3 col-xs-12">
          <SignupForm
            getFields={getFields}
            addFlashMessage={addFlashMessage} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  getFields: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}


export default connect(null, { getFields, addFlashMessage })(SignupPage);
