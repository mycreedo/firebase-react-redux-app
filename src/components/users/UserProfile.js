import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Preloader from '../layout/Preloader'
import ProfileProjects from './profile/ProfileProjects'
import UserBadges from './roles/UserBadges';

class UserProfile extends Component {    
    render() {
        // materializecss init
        window.$(document).ready(function(){
            window.$('.collapsible').collapsible();
        });

        const { user, auth, projects } = this.props;
        const userId = this.props.match.params.id;
        if (!auth.uid) return <Redirect to='/signin' /> 
        if (user && projects) {
            console.log(user.role);
            return (
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <div className="card horizontal">
                                <div className="card-image card-user-head">
                                    <div className="card-initials">
                                        {user.initials}
                                        <UserBadges roles={user.roles} />
                                    </div>
                                </div>
                                <div className="card-stacked">
                                    <div className="card-content">
                                        <div className="card-title">{user.displayName}</div>
                                        <ul className="user-info__list row ">
                                            <li className="user-info__item col s12 m6 l2"><i className="fas fa-phone user-info__icon"></i> {user.phoneNumber ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3') : '---'} </li>
                                            <li className="user-info__item col s12 m6 l2"><i className="fas fa-globe user-info__icon"></i> {user.userWebsite ? user.userWebsite : '---'} </li>
                                            <li className="user-info__item col s12 m6 l2"><i className="fas fa-flag user-info__icon"></i> {projects && projects.filter((project) => project.authorId === userId).length} </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <h4 className="grey-text">Last reports</h4>
                            <ProfileProjects  projects={projects} userId={userId} />
                            
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const users = state.firestore.data.users;
    const user = users ? users[id] : null;
    return {
        user: user,
        auth: state.firebase.auth,
        projects: state.firestore.ordered.projects
    }
}


export default compose(
    firestoreConnect([
        { collection: 'users' },
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
    ]),
    connect(mapStateToProps)
)(UserProfile)
