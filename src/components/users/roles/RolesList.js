import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Preloader from '../../layout/Preloader'
import RolesSummary from './RolesSummary';
import { createRole } from '../../../store/actions/userActions'

class RolesList extends Component {
  state = {}
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRole(this.state)
    e.target.reset()
  }
  render() {
    const { roles, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin' /> 
    if (roles) {
      return (
        <div className="container">
          <div className="row">
            <div className="col s12"><h3 className="grey-text">User roles</h3></div>
            <div className="col s12 m8">
              <div className="card">
                { roles && roles.map((role) => {
                  return (
                    <RolesSummary key={role.id} role={role} />
                  )
                })}
              </div>
            </div>
            <div className="col s12 m4">
                <form className="card" onSubmit={this.handleSubmit}>
                  <h5 className="card-title">Create new role</h5>
                  <div className="input-field">
                    <input type="text" id="name" onChange={this.handleChange}/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <input type="text" id="slug" onChange={this.handleChange}/>
                    <label htmlFor="slug">Slug (e.g. global-mod) </label>
                  </div>
                  <div className="input-field">
                    <input type="text" id="desc" onChange={this.handleChange}/>
                    <label htmlFor="desc">Description</label>
                  </div>
                  <div className="input-field">
                    <input type="text" id="color" onChange={this.handleChange}/>
                    <label htmlFor="color">Color - HEX or RGBA</label>
                  </div>
                  <div className="input-field">
                    <input type="text" id="icon" onChange={this.handleChange}/>
                    <label htmlFor="icon">Icon - only FA classes</label>
                  </div>
                  <div className="center"><button className="btn green"> Create</button></div>
                </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Preloader />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
      auth: state.firebase.auth,
      roles: state.firestore.ordered.user_roles
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    createRole: (role) => dispatch(createRole(role))
  }
}


export default compose(
  firestoreConnect([
      { collection: 'user_roles', orderBy: 'name'}
  ]),
  connect(mapStateToProps, mapDispatchToProps) 
)(RolesList)
