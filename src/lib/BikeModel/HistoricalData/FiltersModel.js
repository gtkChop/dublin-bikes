import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import HistoricalDataGraph from './HistoricalDataGraph'


function FiltersModel(props) {

    const [historicalData, setHistoricalData] = useState({"historic": [], "errors": ""})
    
    useEffect(() => {
        const endPoint = props.config.bikesAPI.dublinBikes.historicalUrl
        const url = `${endPoint}/?dfrom=${props.formData.from}&dto=${props.formData.to}&station=${props.formData.station.data.st_ID}`
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            }
        })
        .then(response => response.json())
        .then(data => {
            props.handleCloseOpenHistoricalDataPane(false)
            if ((data.length > 0) && (data[0].historic.length > 0)) {
                setHistoricalData({"historic": data[0].historic, "errors": ""})
            } else {
                setHistoricalData({"historic": [], "errors": "Error while fetching historical data"})
            }
        })
        .catch((error) => {
            console.warn(error)
            props.handleCloseOpenHistoricalDataPane(false)
            setHistoricalData({"historic": [], "errors": "Error while fetching historical data"})
        })
        
    }, [props.formData.from, props.formData.to, props.formData.station.data.st_ID, props.config.bikesAPI.dublinBikes.historicalUrl])

    if (!props.showhistoricalData) {
        return (
            <div className="bikes__historical_data bikes__widget_component">
                <div style={{position: "absolute", right: "5px", top: "1px"}}>
                    <button 
                        className="btn btn-link bikes__link_for_darkcomponent" 
                        style={{padding: "0", margin: "0", width: "30px"}}
                        onClick={() => props.handleCloseOpenHistoricalDataPane(true)}
                    >
                        <FontAwesomeIcon icon={faTimes} size="sm"/>
                    </button>
                </div>
                <div className="bikes__widget_header">
                    <h5>
                        Historical Data
                    </h5>
                    <h6>
                        {props.formData.station.data.st_NAME}
                    </h6>
                    <small>
                    Station ID:  {props.formData.station.data.st_ID}
                    </small>
                </div>
                <hr></hr>
                <HistoricalDataGraph data={historicalData} />
                
            </div>
        )
     } 
    return null
}

export default FiltersModel