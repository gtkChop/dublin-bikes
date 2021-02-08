import React from 'react'
import {Line} from 'react-chartjs-2'
import {getShortDateTime} from '../utils'

function HistoricalDataGraph(props) {

    const data = {
        labels: [],
        datasets: [
            {
                data: [],
                label: "Available Bikes",
                backgroundColor: "#89ff00"
            },
            {
                data: [],
                label: "Available Bike Stands",
                backgroundColor: "#ff9800"
            }
        ]
    }
 
    const options = {
        legend: {
            display: true,
            labels: {
                fontColor: "#fff"
            }
        },
        scales: {
            xAxes: [{
                gridLines: {display: false},
                ticks: {fontColor: "#fff"}
            }],
            yAxes: [{
                gridLines: {display: false},
                ticks: {fontColor: "#fff"}
            }]
        }
    }

    // 288
    // 15
    //286
    const pushDataToPlot = (item) => {
        data.labels.push(getShortDateTime(item.time))
        data.datasets[0].data.push(item.available_bikes)
        data.datasets[1].data.push(item.available_bike_stands)
        return null
    }

    const prepareData = () => {
        const totalLength = props.data.historic.length
        const multipleOf = Math.floor((totalLength-2)/15)
        if (totalLength > 1) {
            pushDataToPlot(props.data.historic[0])
            for (var i=1; i<props.data.historic.length; i++) {
                if ((i%multipleOf) === 0) {
                    pushDataToPlot(props.data.historic[i])
                }
            }
            pushDataToPlot(props.data.historic[totalLength - 1])
        }
        return null
    }

    if (props.data.historic.length > 0){
        prepareData()
        return (
            <div>
                <Line 
                    data={data} 
                    options={options} 
                    style={{width: "100%", height:"100%"}}
                />
            </div>
        )
    }
    if (props.data.errors.length > 0){ 
        return (
            <div>
                Error While fetching the data
            </div>
        )
    }

    return (
        <div>
            Loading Data....
        </div>
    )
    

    
  
    
    
}

export default HistoricalDataGraph