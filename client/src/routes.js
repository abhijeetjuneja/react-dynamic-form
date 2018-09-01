import React from 'react';
import { Route ,Router} from 'react-router';

import App from './containers/App';
import SignupPage from './containers/signup/SignupPage';
import Auth from './utils/Auth';

export default (
  <Router>
    <Route exact path="/" component={Auth(SignupPage)} auth={false}/>
  </Router>

)
