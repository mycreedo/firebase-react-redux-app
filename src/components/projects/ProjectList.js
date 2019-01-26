import React, { Component } from 'react';
import ProjectSummary from './ProjectSummary';
import { connect } from 'react-redux'
import { deleteProject } from '../../store/actions/projectActions'
import Modal from 'react-modal';
import Pagination from 'react-js-pagination'

Modal.setAppElement('body')

class ProjectList extends Component {
    state = {
        modalIsOpen: false,
        project: ''
    }
    changePage = (page) => {
        this.props.history.push('/page/' + page)
    }    
    openModal = (project) => {
        
        this.setState({
            modalIsOpen: true,
            project: project
        }); 
    }
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }    
    deleteProject = (id) => {
        this.props.deleteProject(id)
    }
    render() {
        const { projects, current_page } = this.props
        // paginations 
        const per_page = 5;
        const start_offset = (current_page - 1) * per_page;
        let start_count = 0;

        // render
        return (
            <div className="project-list section">
                <div className="card">
                    { projects && projects.map((project, index) => {
                        if (index >= start_offset && start_count < per_page) {
                            start_count++;
                            return (
                                <ProjectSummary project={project} key={project.id} openModal={this.openModal}/>
                            )
                        }
                    })}
                </div>
                <div className="row">
                    <div className="col s12 m4">
                        <p>Show {start_offset+1} - {start_offset+per_page <= projects.length ? start_offset+per_page : projects.length } of {projects.length}</p>
                    </div>
                    <div className="col s12 m8 right-align">
                        <Pagination activePage={current_page} 
                            itemsCountPerPage={per_page}
                            totalItemsCount={projects.length}
                            pageRangeDisplayed={5}
                            onChange={this.changePage}
                            firstPageText={<i className="fas fa-angle-double-left"></i>}
                            prevPageText={<i className="fas fa-angle-left"></i>}
                            nextPageText={<i className="fas fa-angle-right"></i>}
                            lastPageText={<i className="fas fa-angle-double-right"></i>}
                            />
                    </div>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} className="modal " >
                    <div className="modal-content">
                        <h3>Are you sure?</h3>
                        <div>This will delete without the ability to recover data</div>
                    </div>
                    <div className="modal-footer">
                        <a className="waves-effect btn-flat waves-grey" onClick={this.closeModal}>close</a>
                        <a className="waves-effect btn red waves-red" onClick={() => {this.deleteProject(this.state.project); this.closeModal()}}>Delete</a>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (project) => dispatch(deleteProject(project))
    }
}

export default connect(null, mapDispatchToProps)(ProjectList)