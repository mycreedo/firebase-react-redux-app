import React, { Component } from 'react'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

class UserBadges extends Component {
    render() {
        const { roles, all_roles } = this.props;
        return (
            <div className="user-badges">
                {roles && all_roles && all_roles.filter(role => roles.includes(role.id) && role.id !== 'user').map((role) => {
                    return (
                        <div key={role.id} className="user-badges__item z-depth-1" style={{background: role.color}}>
                            <i className={role.icon + ' user-badges__icon'}  data-tip={role.name}></i>
                            <ReactTooltip effect="solid" />
                        </div>
                    )
                })}
            </div> 
        )
    }
  
}

const mapStateToProps = (state) => {
    return {
        all_roles: state.firestore.ordered.user_roles
    }
}


export default compose(
    firestoreConnect([
        { collection: 'user_roles', orderBy: ['name', 'desc']}
    ]),
    connect(mapStateToProps)
)(UserBadges)
