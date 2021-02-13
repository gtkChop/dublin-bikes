import React from 'react'
import dark from '../../assets/dark.png'
import light from '../../assets/light.png'
import outdoors from '../../assets/outdoors.png'
import satellite from '../../assets/satellite.png'
import streets from '../../assets/streets.png'
import satellite_streets from '../../assets/satellite_streets.png'


function BaseMaps(props) {
    
    const renderSrc = (val) => {
        var mapType = val.toLowerCase().replace(" ", "_")
        switch(mapType) {
            case 'streets':
                return streets
            case 'dark':
                return dark
            case 'light':
                return light
            case 'outdoors':
                return outdoors
            case 'satellite':
                return satellite
            case 'satellite_streets':
                return satellite_streets
            default:
                return streets

        }
    }

    return (
        <div className="bikes__styles_option_body">

            {
                Object.keys(props.config.map.predefinedBaseMaps).map((bMap, idx) => {
                    return (
                        <div key={idx} className="bikes__styles_option">
                            {bMap}
                            <button 
                                className="btn btn-link"
                                onClick={() => props.switchBaseStyles(props.config.map.predefinedBaseMaps[bMap].baseLayer, props.closeThisPane)}
                            >
                                 <img src={renderSrc(bMap)} alt={bMap}/>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BaseMaps