import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <div className="nav-content">
            <ul className="tabs tabs-transparent">
                <li className="tab"><NavLink to='/signup' className="grey-text darken-3">Signup</NavLink></li>
                <li className="tab"><NavLink to='/signin' className="grey-text darken-3">Login</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks