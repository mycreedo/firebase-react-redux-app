import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

const ProfileProject = ({projects, userId}) => {
  return (
        <ul className="collapsible z-depth-0 radius">
            {projects && projects.filter((project) => project.authorId === userId).map((project) => {
                return (
                    <li key={project.id}>
                        <div className="collapsible-header">
                            <i className={"fas status-" + project.projectStatus} data-tip={project.projectStatus}></i>
                            <ReactTooltip effect="solid" />
                            <span className="collapsible-project-title">{project.title}</span>
                            <Link to={'/project/' + project.id} key={project.id} className="grey-text">
                                <span className="fas fa-external-link-alt" data-tip="Go to project"></span>
                            </Link>
                        </div>
                        <div className="collapsible-body white">
                            <div className="row">
                                <div className="col s6 l2">
                                    <div className="grey-text">Author:</div>
                                    <Link to={"/user/" + project.authorId}>{project.authorName}</Link>
                                </div>
                                <div className="col s6 l2">
                                    <div className="grey-text">Reported:</div>
                                    {moment(project.createdAt.toDate()).format('DD MMMM YYYY HH:mm')}
                                </div>
                                <div className="col s6 l2">
                                    <div className="grey-text">Status:</div>
                                    {project.projectStatus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">                                    
                                    <div className="grey-text">Description:</div>
                                    {project.content}
                                </div>
                            </div>
                        </div>                             
                    </li>
                )
            })}
        </ul>
  )
}

export default ProfileProject
