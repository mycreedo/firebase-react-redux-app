import React, { Component } from 'react' ;
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Preloader from '../layout/Preloader'

class Dashboard extends Component {
    render() {
        const { projects, auth, notifications, current_page } = this.props
        if (!auth.uid) return <Redirect to='/signin' /> 
        if (projects && notifications) {
            
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m8">
                            <ProjectList projects={projects} current_page={current_page} history={this.props.history}/>
                            
                        </div>
                        <div className="col s12 m4">
                            <Notifications notifications={notifications}/>
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


const mapStateToProps = (state,ownProps) => {
    return {
        current_page: ownProps.match.params.page ? Number(ownProps.match.params.page) : 1,
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
    ])
)(Dashboard)