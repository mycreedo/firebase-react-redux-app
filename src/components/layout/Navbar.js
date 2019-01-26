import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth, profile } = props;
    
    return (
        <header>
            <nav className="nav-extended transparent z-depth-0 container">
                <div className="nav-wrapper">
                    <div className="row">
                        <div className="col s12">
                            { auth.uid && <a data-target="slide-out" className="sidenav-trigger"><i className="fas fa-bars material-icons"></i></a>}
                            <Link to='/' className="brand-logo grey-text"> <span>PLAN</span>MYCREEDO </Link>
                        </div>                    
                    </div>
                </div>
                {!auth.uid && document.body.classList.remove('has-fixed-sidenav')}
                {!auth.uid && <SignedOutLinks /> }
            </nav>
            { auth.uid && document.body.classList.add('has-fixed-sidenav')}
            { auth.uid && <SignedInLinks profile={profile} auth={auth}/> }
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)