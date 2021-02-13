import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'

function WorkSpaceIcon(props) {
    return (
        <div 
            className="map__icon_window"
            >
            <button className="btn btn-link map__toggle_button" onClick={() => props.clickEvent()}>
                Work Space
                <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            </button>
        </div>
    )
}

export default WorkSpaceIcon