import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

const ProjectSummary = ({project, openModal}) => {
    return (
        <div className="card-content project-summary">
            <div className="row">
                <div className="col s2 l1 status-icon">
                    <i className={"fas status-" + project.projectStatus} data-tip={project.projectStatus}></i>
                    <ReactTooltip effect="solid" />
                </div>
                <div className="col s10 l5">
                    <Link to={'/project/' + project.id} key={project.id} className="card-title grey-text ">
                        {project.title}
                    </Link>
                </div>
                <div className="col s6 l2">
                    <div className="grey-text">Author:</div>
                    <Link to={"/user/" + project.authorId}>{project.authorName}</Link>
                </div>
                <div className="col s6 l2">
                    <div className="grey-text">Reported:</div>
                    {moment(project.createdAt.toDate()).fromNow()}
                </div>
                <div className="col s2 l2 right-align">
                    <a onClick={() => {openModal(project.id)}} className="btn-flat red-text"><i className="far fa-trash-alt"></i></a>
                    <Link to={'/project/edit/' + project.id } key={'edit-' + project.id} className="btn-flat orange-text">
                        <i className="far fa-edit"></i> 
                    </Link>
                </div>
            </div>                
        </div>
    )
}

export default ProjectSummary 