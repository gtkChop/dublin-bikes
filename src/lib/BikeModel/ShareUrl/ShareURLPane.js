import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faClipboard, faCheckCircle } from '@fortawesome/fontawesome-free-solid'
import ShareUrlEmbed from './ShareUrlEmbed'
import copy from "copy-to-clipboard"

function ShareURLPane(props) {

    const shareUrlCopyRef = useRef()
    const copyText = (e, currentRef) => {
        currentRef.style.display = "block";
        copy(props.shareURL);
    }

    return (
        <div 
            className="bikes__styles_option_pane bikes__share_url">
            <FontAwesomeIcon 
                className="caret-up" 
                icon={faCaretUp} size="2x"
            />
            <div 
                className="bikes__styles_options">
                <div 
                    className="bikes__styles_option_header">
                    Share URL
                </div>
                <div 
                    className="bikes__styles_option_body" style={{padding: "10px"}}>
                    <small 
                        style={{marginBottom: "10px"}}>
                        You can share this URL by copying the below URL
                    </small>
                    <div 
                        className="bikes__input_url">
                        <input 
                            type="url" value={props.shareURL} 
                            onChange={() => null}
                        >
                        </input>
                        <button 
                            className="btn btn-info" onClick={(e) => copyText(e, shareUrlCopyRef.current)}>
                            <FontAwesomeIcon 
                                icon={faClipboard} size="lg"
                            />
                        </button>
                    </div>
                    <small 
                        ref={shareUrlCopyRef} 
                        style={{display: "none"}}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} style={{marginRight: "5px"}}/>
                        Copied !!
                    </small>
                </div>
                <ShareUrlEmbed copyText={copyText} shareURL={props.shareURL}/>
            </div>
        </div>
    )
}

export default ShareURLPane