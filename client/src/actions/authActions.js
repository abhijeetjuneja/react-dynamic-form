import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/users/login', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function googleCallbackRequest(url) {
    return dispatch => {
      return axios.get(url);
    }
}

export function googleLoginRequest(data) {
    return dispatch => {
      return axios.post(`/api/users/auth/google/login`,data).then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
      });;
    }
}


export function verifyGoogleTokenRequest(token) {
    return dispatch => {
      return axios.post(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=`+token);
    }
}

export function googleLogin(token) {
  return dispatch => {
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  }
}

export function getUserInfoRequest() {
  return dispatch => {
    return axios.get('/api/users/current/info');
  }
}
