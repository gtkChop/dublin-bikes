import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/fontawesome-free-solid'
import ShareURLPane from '../../BikeModel/ShareUrl/ShareURLPane'

function ShareUrlNav (props) {
    
    return (
        <div className="layer_control">
            <button className="btn btn-link widget_nav" onClick={props.shareUrlHandler}>
                <FontAwesomeIcon icon={faShare} style={{marginRight: "5px"}} size="sm"/>
                Share
            </button>
            {
                props.shareUrl ?
                <ShareURLPane shareURL={props.shareUrl}/>
                :null
            }
            
        </div>
    )
}

export default ShareUrlNav
