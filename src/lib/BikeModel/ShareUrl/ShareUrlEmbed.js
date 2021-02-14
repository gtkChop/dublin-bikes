import React, {useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faCheckCircle } from '@fortawesome/fontawesome-free-solid'

function ShareUrlEmbed(props) {

    const [iframeHeightWidth, SetIframeHeightWidth] = useState({
        height: "600px",
        width: "600px"
    })

    const embedUrlCopy = useRef()
    const getIframeUrl = () => {
        return `<iframe src=${props.shareURL} title="Dublin bikes dashboard" width="${iframeHeightWidth.width}" height="${iframeHeightWidth.height}"></iframe>`
    }

    const onChangeHeightWidthHandler = (e, type) => {
        SetIframeHeightWidth(prevHeightWidth => { 
            switch(type) {
                case 'height':
                    return {width: prevHeightWidth.width, height:e.target.value}
                case 'width':
                    return {height: prevHeightWidth.height, width:e.target.value}
                default:
                    return null
            }
        })
    }

    return (
        <>
            <div className="bikes__styles_option_header">
                    Embed URL
                </div>
                <div 
                    className="bikes__styles_option_body" 
                    style={{padding: "10px"}}>
                    <small style={{marginBottom: "10px"}}>
                       Copy the below URL to embed current map as iframe.
                    </small>
                    <div className="bikes__input_url">
                        <div 
                            style={{display: "flex", marginBottom: "10px",}}>
                            <div 
                                style={{paddingRight: "5px", display: "flex", flexDirection: "column"}}>
                                <label htmlFor="heigth" style={{marginRight: "5px"}}>Set Hieght</label>
                                <input 
                                    id="heigth"
                                    type="text" value={iframeHeightWidth.height} 
                                    onChange={(e) => onChangeHeightWidthHandler(e, "height")}
                                >
                                </input>
                            </div>
                            <div 
                                style={{paddingLeft: "5px", display: "flex", flexDirection: "column"}}>
                                <label htmlFor="width" style={{marginRight: "5px"}}>Set Width</label>
                                <input 
                                    id="width"
                                    type="text" value={iframeHeightWidth.width} 
                                    onChange={(e) => onChangeHeightWidthHandler(e, "width")}
                                >
                                </input>
                            </div>
                        </div>
                        
                        <input 
                            id="embed"
                            type="url" value={getIframeUrl()} 
                            onChange={() => null}
                        >
                        </input>
                        <button 
                            className="btn btn-info" 
                            onClick={(e) => props.copyText(e, embedUrlCopy.current)}>
                            <FontAwesomeIcon 
                                icon={faClipboard} size="lg"
                            />
                        </button>
                    </div>
                    <small 
                        ref={embedUrlCopy} 
                        style={{display: "none"}}
                    >
                        <FontAwesomeIcon icon={faCheckCircle} style={{marginRight: "5px"}}/>
                        Copied !!
                    </small>
                </div>
        </>
    )
}

export default ShareUrlEmbed
