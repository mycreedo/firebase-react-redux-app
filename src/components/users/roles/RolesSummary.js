import React from 'react'
import ReactTooltip from 'react-tooltip'

const RolesSummary = ({role}) => {
  return (
    <div className="card-content project-summary">
      <div className="row">
          <div className="col s2 l1 status-icon">
              <i className={role.icon} data-tip={role.name} style={{color: role.color ? role.color : 'black'}}></i>
              <ReactTooltip effect="solid" />
          </div>
          <div className="col s5 l2">                       
            <div className="grey-text">Name:</div>
            {role.name}
          </div>
          <div className="col s5 l2">                       
            <div className="grey-text">Slug:</div>
            {role.slug}
          </div>
          <div className="col s6 l5">
              <div className="grey-text">Description:</div>
              {role.desc}
          </div>
          <div className="col s2 l2 right-align">
          </div>
      </div>                
    </div>
  )
}

export default RolesSummary
