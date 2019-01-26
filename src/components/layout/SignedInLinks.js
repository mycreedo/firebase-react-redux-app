import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import bg from '../../images/bg.jpg'
import UserBadges from '../users/roles/UserBadges';

const SignedInLinks = (props) => {
    window.$(document).ready(function(){
        window.$('.sidenav').sidenav();
    });
    return (
        <ul id="slide-out" className="sidenav sidenav-fixed z-depth-0">
            <li><div className="user-view">
                <div className="background">
                    <img src={bg} alt="" />
                </div>
                <span className="circle z-depth-3 card-initials">{props.profile.initials}<UserBadges roles={props.profile.roles} /></span>
                <Link to={'/user/' + props.auth.uid}><span className="white-text">{props.profile.displayName}</span></Link>
                <a href="#email"><span className="white-text email">{props.profile.email}</span></a>
            </div></li>
            <li><Link to={'/user/edit/' + props.auth.uid}> <i className="fas fa-edit"></i> Edit profile</Link></li>
            <li><Link to='/create'><i className="fas fa-plus"></i>  New Project</Link></li>
            <li className="divider"></li>
            <li><Link to='/users'><i className="fas fa-users"></i>  Users </Link></li>
            <li><Link to='/user_roles'><i className="fas fa-user-tie"></i>  Roles</Link></li>
            <li className="divider"></li>
            <li><a onClick={props.signOut}><i className="fas fa-sign-out-alt"></i>  Log Out</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)