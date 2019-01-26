import React from 'react'
import moment from 'moment'

const AccessInfo = ({displayName, auth}) => {
  return (
    <div className="card blue lighten-1 white-text radius">
        <div className="card-content">
            <div className="row">
                <div className="col s12">
                    <span className="card-title">{displayName} - Access info</span>
                </div>
                <div className="col s12 m4">Joined</div>
                <div className="col s12 m8 right-align">{auth.createdAt ? moment.unix(auth.createdAt / 1000).format("DD.MM.YYYY [ at ] HH:mm:ss") : null}</div>
                <div className="col s12 m4">Last Login</div>
                <div className="col s12 m8 right-align">{auth.lastLoginAt ? moment.unix(auth.lastLoginAt / 1000).format("DD.MM.YYYY  [ at ]  HH:mm:ss") : null}</div>
            </div>
        </div>
    </div>
  )
}

export default AccessInfo
