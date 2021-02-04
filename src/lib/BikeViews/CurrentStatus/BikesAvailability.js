import React, {useState, useEffect} from 'react'
import fetch from 'cross-fetch'
import {getCurrentDateDiffHours} from '../../BikeModel/utils'
import BikeStatus from './BikeStatus'

function BikesAvailability(props) {

    //const [bikeStatus, setBikesStatus] = useState({})
    const [errorMessage, seterrorMessage] = useState({})
    //const dateRange = getCurrentDateDiffHours(1)
    const selectedStationData = props.selectedStationData
    /*
    useEffect(() => {
        const url = props.config.bikesAPI.dublinBikes.historicalUrl
        console.log(url)
        console.log(selectedStationData)
        console.log(dateRange)
        fetch(`${url}/?dfrom=${dateRange.diffDate}&dto=${dateRange.currentDate}&station=${selectedStationData.st_ID}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if ((data.length > 0) && (data[0].historic.length > 0)) {
                setBikesStatus(data[0].historic.pop())
            } else {
                seterrorMessage({"msg": "Current data is empty for a given status"})
            }
        })
        .catch((error) => {
            console.warn(error)
            seterrorMessage({"msg": "Bikes API service is down. Cannot retrieve data"})
        })
        
    }, []) */

    const bikeStatus = {'available_bike_stands': 17, 'available_bikes': 3, 'bike_stands': 20, 'status': 'open', 'time': '2021-02-04T22:00:02Z'}

    if ((Object.keys(bikeStatus).length > 0) ||(Object.keys(bikeStatus).length > 0)) {
        return (
            <div className="bikes__station_status bikes__widget_component">
                <BikeStatus 
                    bikeStatus={bikeStatus} 
                    errorMessage={errorMessage} 
                    historicaData={bikeStatus}
                    selectedStationData={selectedStationData}
                />
            </div>
        )
    } else {
        return null
    }
}

export default BikesAvailability
