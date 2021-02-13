import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faCaretUp } from '@fortawesome/fontawesome-free-solid'
import BaseMaps from '../../BikeModel/Map/BaseMaps'

function LayerControl(props) {
    const [toggle, setToggle] = useState(false)

    const closeThisPane = () => {
        setToggle(false)
    }

    return (
        <>
        <div className="layer_control">
            <button className="btn btn-link widget_nav" onClick={() => setToggle(prevToggle => !prevToggle)}>
                <FontAwesomeIcon icon={faMap} style={{marginRight: "5px"}} size="sm"/>
                Styles
            </button>
            {
            toggle?
                <div className="bikes__styles_option_pane">
                    <FontAwesomeIcon className="caret-up" icon={faCaretUp} size="2x"/>
                <div className="bikes__styles_options">
                    <div className="bikes__styles_option_header">
                        Map Styles
                    </div>
                    <BaseMaps 
                        config={props.config} 
                        switchBaseStyles={props.switchBaseStyles} 
                        baseLayer={props.baseLayer}
                        closeThisPane={closeThisPane}
                    />
                </div>
                </div>
                : null
            }
        </div>
        </>
    )
}

export default LayerControl