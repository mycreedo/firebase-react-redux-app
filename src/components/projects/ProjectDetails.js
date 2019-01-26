import React, { Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import UserBadges from '../users/roles/UserBadges'



class ProjectDetails extends Component {
    handleDelete = () => {
        this.props.history.push('/');
        this.props.deleteProject(this.props.id)
    }
    render() {
        const { project, auth} = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card">
                        <div className="section row">
                            <div className="col s12 m2">
                                <div className="center-align">
                                    <div className="card-initials orange lighten-5">{project.author.initials}
                                        <UserBadges roles={project.author.roles} />
                                    </div>
                                    <h6>{project.author.displayName}</h6>
                                </div>
                            </div>
                            <div className="col s12 m10">
                                <div className="">
                                    <span className="card-title">{ project.title } - {moment(project.createdAt.toDate()).format('DD MMMM YY HH:mm')}</span>
                                    <p> { project.content } </p>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    let project = projects ? projects[id] : null;

    project = state.firestore.data.users && project ? {...project, author: state.firestore.data.users[project.authorId]} : project;
    return {
        id: id,
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (project) => dispatch(deleteProject(project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'projects' }
    ])
)(ProjectDetails)
