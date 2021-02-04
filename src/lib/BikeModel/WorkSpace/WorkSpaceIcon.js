import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faArrowLeft } from '@fortawesome/fontawesome-free-solid'

function WorkSpaceIcon(props) {
    return (
        <div 
            className="map__icon_window" 
            style={{
                top: "3%",
                right: "2%"
            }}>
            <button className="btn btn-link map__toggle_button" onClick={() => props.clickEvent()}>
                <h6>Work Space</h6>
                <FontAwesomeIcon icon={faToolbox} size="sm" /> &nbsp;
                <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            </button>
        </div>
    )
}

export default WorkSpaceIcon