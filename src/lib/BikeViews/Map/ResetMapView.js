import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowRestore } from '@fortawesome/fontawesome-free-solid'

function ResetMapView(props) {
    return (
        <div className="layer_control">
            <button className="btn btn-link widget_nav" onClick={() => props.handleMapReset()}>
                <FontAwesomeIcon icon={faWindowRestore} style={{marginRight: "5px"}} size="sm"/>
                Reset View
            </button>
        </div>
    )
}

export default ResetMapView