import React from 'react'

function ResetMapView(props) {
    return (
        <div className="bikes__reset_map_view">
            <button className="btn btn-link" onClick={() => props.handleMapReset()}>
                Reset View
            </button>
        </div>
    )
}

export default ResetMapView