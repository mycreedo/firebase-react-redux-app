import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect, Link } from 'react-router-dom'
import { compose } from 'redux'
import UserBadges from './roles/UserBadges';

class UsersList extends Component {
  render() {
    const {all_users, current_user, auth} = this.props    
    if (!auth.uid) return <Redirect to='/signin' /> 
    
    
    return (
      <div className="container row">
        <div className="col s12"><h3 className="grey-text">Users list</h3></div>
        {all_users && all_users.map(user => {
            // edit user link
            const edit_link = <Link to={'/user/edit/' + user.id } className="btn-floating halfway-fab waves-effect waves-light orange"><i className="fas fa-user-edit"></i></Link>

            return (
                <div className="col s12 m6 l4 xl3" key={user.id}>                    
                    <div className="card">
                        <div className="card-user-head card-image">
                            <div className="card-initials z-depth-1">{user.initials} <UserBadges roles={user.roles} /></div>
                            {current_user.roles.includes('admin') && edit_link }
                        </div>
                        <div className="card-content">
                            <span className="card-title"><Link to={'/user/' + user.id } className="black-text">{user.displayName}</Link></span>
                            <ul className="user-info__list">
                                <li className="user-info__item"><i className="fas fa-phone user-info__icon"></i> {user.phoneNumber ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') : '---'} </li>
                                <li className="user-info__item"><i className="fas fa-globe user-info__icon"></i> {user.userWebsite ? user.userWebsite : '---'} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    const users = state.firestore.data.users
    const current_user = users ? users[state.firebase.auth.uid] : null
    return {
        current_user: current_user,
        all_users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users', orderBy: 'displayName'}
    ]),
)(UsersList)
