import React, {useState, useEffect} from 'react'
import fetch from 'cross-fetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff, faTimes } from '@fortawesome/fontawesome-free-solid'
import {getCurrentDateDiffHours} from '../../BikeModel/utils'
import BikeStatus from './BikeStatus'

function BikesAvailability(props) {
    
    const [bikeStatus, setBikesStatus] = useState({"bike_status": {}, "errors": {}})
    const selectedStationData = props.selectedStationData

    const [toggle, setToggle] = useState(true)
    const toggleHandler = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        const endPoint = props.config.bikesAPI.dublinBikes.historicalUrl
        const dateRange = getCurrentDateDiffHours(1)
        const url = `${endPoint}/?dfrom=${dateRange.diffDate}&dto=${dateRange.currentDate}&station=${props.selectedStationData.st_ID}`
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
            if ((data.length > 0) && (data[0].historic.length > 0)) {
                setBikesStatus({"bike_status": data[0].historic.pop(), "errors": {}})
            } else {
                setBikesStatus({"bike_status": {}, "errors": {"msg": "Current data is empty for a given status"}})
            }
        })
        .catch((error) => {
            console.warn(error)
            setBikesStatus({"bike_status": {}, "errors": {"msg": "Current data is empty for a given status"}})
        })
        
    }, [props.selectedStationData.st_ID, props.config.bikesAPI.dublinBikes.historicalUrl])


    return (
        <div 
            className="bikes__station_status bikes__widget_component">
            <div 
                style={{position: "absolute", right: "5px", top: "1px"}}>
                <button 
                    className="btn btn-link bikes__link_for_darkcomponent" 
                    style={{padding: "0", margin: "0", width: "30px"}}
                    onClick={() => toggleHandler()}
                >
                    <FontAwesomeIcon icon={toggle?faToggleOn:faToggleOff} size="sm"/>
                </button>
                <button 
                    className="btn btn-link bikes__link_for_darkcomponent" 
                    style={{padding: "0", margin: "0", width: "30px"}}
                    onClick={() => props.closeHandler()}
                >
                    <FontAwesomeIcon icon={faTimes} size="sm"/>
                </button>
            </div>
            <div className="bikes__widget_header">
                <h5 style={{marginBottom: "0"}}>{props.selectedStationData.st_NAME}</h5>
                <small>ID: {props.selectedStationData.st_ID}</small>
                <small>Address: {props.selectedStationData.st_ADDRESS}</small>
            </div>
          
            <BikeStatus 
                bikeStatus={bikeStatus.bike_status} 
                errorMessage={bikeStatus.errors} 
                selectedStationData={selectedStationData}
                toggle={toggle}
            />
        </div>
    )
}

export default BikesAvailability
