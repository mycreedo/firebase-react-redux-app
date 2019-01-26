import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateUserProfile } from '../../../store/actions/userActions'
import AccessInfo from './AccessInfo';

class CurrentUserDetails extends Component {
    
    state = {}
    handleMultipleSelect = (e) => {
        const instance = window.M.FormSelect.getInstance(e.target)
        this.setState({...this.state, roles: instance.getSelectedValues()})
    }
    handleChange = (e) => {
        if (e.target.id === 'displayName') {
            let initials = e.target.value.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
            this.setState({...this.state, initials: initials[1] ? (initials[0] + initials[1]) : initials[0]})
        }
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUserProfile(this.props.user.id, this.state)
        this.props.history.push('/users');
    }
    
  render() {
    
    // materialize init
    window.$(document).ready(function(){
      window.M.AutoInit();
    });

    const { user, auth, roles } = this.props;    
    if (!auth.uid) return <Redirect to='/signin' /> 
    if (user && auth && roles) {
        return (
            <div className="container section">
                <div className="row">
                    <div className="col s12 m8">
                        <div className="card">
                            <div className="row">
                                <div className="col s12">
                                <ul className="tabs">
                                    <li className="tab col s3"><a className="active" href="#tab1">Edit profile</a></li>
                                    <li className="tab col s3 disabled"><a href="#tab2">Change email</a></li>
                                    <li className="tab col s3 disabled"><a href="#tab3">Change pasword</a></li>
                                    <li className="tab col s3"><a href="#tab4">Admin options</a></li>
                                </ul>
                                </div>
                                <div id="tab1" className="col s12">
                                    <form onSubmit={this.handleSubmit} style={{marginTop: 0}}>
                                        <div className="row"><div className="col s12 card-title">Edit profile</div></div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" className="validate" id="displayName" defaultValue={user.displayName} onChange={this.handleChange}/>
                                                <label className="active" htmlFor="displayName">Full Name</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input type="text" className="validate" id="phoneNumber" defaultValue={user.phoneNumber} onChange={this.handleChange}/>
                                                <label className="active" htmlFor="phoneNumber">Phone</label>
                                            </div>
                                            <div className="input-field col s12">
                                                <input type="text" className="validate" id="userWebsite" defaultValue={user.userWebsite} onChange={this.handleChange}/>
                                                <label className="active" htmlFor="userWebsite">Website</label>
                                            </div>
                                            <div className="center">
                                                <button className="btn waves-effect waves-light blue lighten-1" >Submit </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div id="tab2" className="col s12">Test 2</div>
                                <div id="tab3" className="col s12">Test 3</div>
                                <div id="tab4" className="col s12">
                                    <div className="input-field col s12">
                                        <form onSubmit={this.handleSubmit} style={{marginTop: 0}}>
                                            <div className="row"><div className="col s12 card-title">Admin options</div></div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <select id="role" multiple defaultValue={user.roles} onChange={this.handleMultipleSelect}>
                                                        { roles && roles.map( (role) => {
                                                            return (
                                                                <option key={role.id} value={role.id}>{role.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <label htmlFor="role">Change role</label>
                                                </div>
                                                <div className="center">
                                                    <button className="btn waves-effect waves-light blue lighten-1" >Submit </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col s12 m4">
                        { user.id === auth.uid ? <AccessInfo auth={auth} displayName={user.displayName} /> : null }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container section">
                <div className="card">
                    <div className="card-content">
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    const editedUserId = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[editedUserId] : null;
    const current_user = users ? users[state.firebase.auth.uid] : null
    return {
        current_user: current_user,
        user:  {id: editedUserId, ...user },
        roles: state.firestore.ordered.user_roles,
        auth: state.firebase.auth        
    }
}

const mapDsipatchToProps = dispatch => {
    return {
        updateUserProfile: (id, data) => dispatch(updateUserProfile(id, data))
    }
}

export default compose(
    firestoreConnect([
        { collection: 'users'},
        { collection: 'user_roles', orderBy: 'name'}
    ]),
    connect(mapStateToProps, mapDsipatchToProps)
)(CurrentUserDetails)
