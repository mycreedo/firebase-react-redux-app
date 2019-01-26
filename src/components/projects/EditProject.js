import React, { Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject, updateProject } from '../../store/actions/projectActions'
import Preloader from '../layout/Preloader'



class EditProject extends Component {
    state = {}
    handleDelete = () => {
        this.props.history.push('/');
        this.props.deleteProject(this.props.id)
    }
    handleChange = (e) => {
        let id = e.target.id;
        this.setState({
            ...this.state,
            [id]: e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateProject(this.props.id, this.state);
        this.props.history.push('/project/' + this.props.id);
    }
    render() {
        console.log(this.state)
        const { project, auth} = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        if (project) {
            return (
                <div className="container row">
                    <div className="col s12 m8">
                        <div className="card ">
                            <form className="card-content edit-project" onSubmit={this.handleSubmit}>
                                <div className="card-title">Edit project</div>
                                <div className="input-field">
                                    <input id="title" type="text" defaultValue={ project.title } onChange={this.handleChange}/>         
                                    <label className="active">Title:</label>                       
                                </div>
                                <div className="input-field">
                                    <textarea id="content" className="materialize-textarea" defaultValue={ project.content }  onChange={this.handleChange}></textarea>
                                    <label className="active">Content:</label>
                                </div>
                                <div className="input-field">
                                    <label className="active">Status:</label><br />
                                    <select id="projectStatus" onChange={this.handleChange} defaultValue={project.projectStatus} className="browser-default">
                                        <option value='new'> New </option>
                                        <option value='ongoing'> Ongoing </option>
                                        <option value='completed'> Completed </option>
                                        <option value='error'> Error </option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn green">Save</button>
                            </form>
                            <div className="card-action gret lighten-4 grey-text">                                
                                <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                                <div>{moment(project.createdAt.toDate()).calendar()}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 m4">
                        <div className="card">
                            <div className="card-content center-align">
                                <a className="red-text btn-flat" onClick={this.handleDelete}> <i className="far fa-trash-alt"></i> DELETE</a>
                            </div>
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
    // console.log(state)
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        id: id,
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (project) => dispatch(deleteProject(project)),
        updateProject: (id, project) => dispatch(updateProject(id, project))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(EditProject)
