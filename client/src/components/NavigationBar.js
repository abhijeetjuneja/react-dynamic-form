import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right" style={{backgroundColor:'transparent',color:'white'}}>
        <li><a href="/pokemons" style={{backgroundColor:'transparent',color:'white'}}>Pokemons</a></li>
        <li><a href="/me"style={{backgroundColor:'transparent',color:'white'}} >My Profile</a></li>
        <li><a href="/" style={{backgroundColor:'transparent',color:'white'}} onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right" style={{backgroundColor:'transparent',color:'white'}}>
        <li><Link to="/signup" style={{backgroundColor:'transparent',color:'white'}}>Sign up</Link></li>
        <li><Link to="/login" style={{backgroundColor:'transparent',color:'white'}}>Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default" style={{border:'none',backgroundColor:'transparent',color:'white',webkitboxShadow:'0 8px 6px -6px white',
    mozboxShadow: '0 8px 6px -6px white',boxShadow: '0 8px 6px -6px white'}}>
      <strong>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" style={{backgroundColor:'transparent',color:'white'}} className="navbar-toggle" data-toggle="collapse" data-target="#navigationbar">
               <span className="sr-only">Toggle navigation</span>
               <span className="icon-bar" style={{backgroundColor:'white'}}></span>
               <span className="icon-bar" style={{backgroundColor:'white'}}></span>
               <span className="icon-bar" style={{backgroundColor:'white'}}></span>
            </button>
            <Link to="/" className="navbar-brand" style={{backgroundColor:'transparent',color:'white'}}>Pokemon Center</Link>
          </div>
          <div className="collapse navbar-collapse" id="navigationbar" style={{backgroundColor:'transparent',color:'white'}}>
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
        </strong>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
