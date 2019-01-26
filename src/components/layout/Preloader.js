import React from 'react'

const Preloader = () => {
    return (
        <div className="container section">
            <div className="card">
                <div className="card-content">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preloader
