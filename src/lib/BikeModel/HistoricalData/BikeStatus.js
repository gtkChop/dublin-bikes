import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function BikeStatus(props) {

    if (Object.keys(props.bikeStatus).length > 0) {

        const data = {
            labels: ["Available Bikes", "Available Bike Stands"],
            datasets: [{
                data: [props.bikeStatus.available_bikes, props.bikeStatus.available_bike_stands],
                backgroundColor: ["#35ddc1", "#35aedd"],
                borderColor: "#025867"
    
            }]
        }
     
        const options = {
            legend: {
                display: true,
                labels: {
                    fontColor: "#23d1f5"
                }
            }
        }

        return (
            <>
                {
                    props.toggle?
                    <>
                        <hr></hr>
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
                    :null
                }
            </>
        )

    }

    if (Object.keys(props.errorMessage).length > 0) {
        return (
            <>
                <hr></hr>
                <div className="bikes__widget_body_header bikes__errors">
                    {props.errorMessage.msg}
                </div>
            </>
        )
    }

    return props.toggle? (
        <>
            <hr></hr>
            <div className="bikes__widget_body_header">
                Loading Data .....
            </div>
        </>    
    ): null
    
}

export default BikeStatus