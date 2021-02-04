import React, {useState} from 'react'
import {Doughnut} from 'react-chartjs-2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff } from '@fortawesome/fontawesome-free-solid'

function BikeStatus(props) {

    const [toggle, setToggle] = useState(false)

    const toggleHandler = () => {
        setToggle(!toggle)
    }

    const data = {
        labels: ["Available Bikes", "Available Bike Stands"],
        datasets: [{
            data: [props.bikeStatus.available_bikes, props.bikeStatus.available_bike_stands],
            backgroundColor: ["#89ff00", "#ff9800"]

        }]
    }
 
    const options = {
        legend: {
            display: true,
            labels: {
                fontColor: "#fff"
            }
        }
    }

    if (toggle) {
        return (
            <>
                <div>
                <button 
                    className="btn btn-link bikes__link_for_darkcomponent" 
                    style={{padding: "0", position: "absolute", top: "1px", right: "10px"}}
                    onClick={() => toggleHandler()}
                >
                    <FontAwesomeIcon icon={faToggleOff} size="sm" />
                </button>
                </div>
                <div className="bikes__widget_header">
                    <h5 style={{marginBottom: "0"}}>{props.selectedStationData.st_NAME}</h5>
                    <small>ID: {props.selectedStationData.st_ID}</small>
                    <small>Address: {props.selectedStationData.st_ADDRESS}</small>
                </div>
            </>
        )

    } else {
        return (
            <>
                <div>
                    <button 
                        className="btn btn-link bikes__link_for_darkcomponent" 
                        style={{padding: "0", position: "absolute", top: "1px", right: "10px"}}
                        onClick={() => toggleHandler()}
                    >
                        <FontAwesomeIcon icon={faToggleOn} size="sm" />
                    </button>
                </div>
                <div className="bikes__widget_header">
                    <h5 style={{marginBottom: "0"}}>{props.selectedStationData.st_NAME}</h5>
                    <small>ID: {props.selectedStationData.st_ID}</small>
                    <small>Address: {props.selectedStationData.st_ADDRESS}</small>
                </div>
                <hr></hr>
                {
                    Object.keys(props.errorMessage).length ?
                        <div>
                            {props.errorMessage.msg}
                        </div>
                    : 
                    <>
                        <div className="bikes__widget_body_header" style={{color: "#fff"}}>
                            <small>Timestamp: {props.bikeStatus.time}</small>
                            <small>Status: {props.bikeStatus.status.toUpperCase()}</small>
                            <small>Available Bikes: {props.bikeStatus.available_bikes}</small>
                            <small>Available Bike Stands: {props.bikeStatus.available_bike_stands}</small>
                            <small>Total Bike Stands: {props.bikeStatus.bike_stands}</small>
                        </div>
                        <div>
                            <Doughnut data={data} options={options} style={{width: "100%", height:"100%"}}/>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default BikeStatus