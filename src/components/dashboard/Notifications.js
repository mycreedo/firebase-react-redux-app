import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications } = props;
    return (
        <div className="section">
            <div className="card ">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        { notifications && notifications.map(item => {
                            return (
                                <li key={item.id}>
                                    <div className="notification__icon"><i className={"fas fa-" + item.icon}></i></div>
                                    <div>
                                        <div>{item.user} - {item.content}</div>
                                        <span className="grey-text note-date">
                                            {moment(item.time.toDate()).fromNow()}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications