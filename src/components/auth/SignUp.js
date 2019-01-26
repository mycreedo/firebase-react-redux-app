import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {}
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }
  render() {
    const { auth, authError } = this.props
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit} >
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <input type="email" id="email" onChange={this.handleChange}/>
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input type="password" id="password" onChange={this.handleChange}/>
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field">
            <input type="text" id="displayName" onChange={this.handleChange}/>
            <label htmlFor="displayName">Display Name</label>
          </div>
          <div className="input-field">
            <button className="btn blue lighten-1 ">
              Sign Up
            </button>
            <div className="red-text center">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
