import React, {useEffect, useState} from 'react'
import Select from 'react-select';

function Filters(props) {
    const [stations, setStations] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() => {
        var options = []
        props.allStations.map(station => {
            options.push({
                value: station.st_ID,
                label: station.st_NAME,
                data: station
            })
            return null
        })
        setStations(options)
    }, [])  
      
    const handleSelectedStation = selectedOption => {
        setSelectedOption(selectedOption)
      }
    
      

    return (
        <>
        <h4 style={{textAlign: "center", marginBottom: "0px", marginTop: "10px"}}>Historical Data</h4>
        <hr></hr>
        <div className="bike__stations bikes__component">
            <div className="bikes__component">
                <div className="bikes__historical_filter">
                    <p>Select the station and dates to view the historical data. 
                    Please note only a max period of 3 days can be selected</p>
                    <div>
                        * Max allowed period is 3 days.
                    </div>
                    <form>
                        <div style={{marginTop: "15px"}}>
                            <label>Station: </label>
                            <Select
                                value={selectedOption}
                                onChange={handleSelectedStation}
                                options={stations}
                                className="bikes_station_select"
                                classNamePrefix="bikes_station_select"
                                placeholder="Select Station"
                            />
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <label>From: </label>
                            <input type="time"></input>
                            <input type="date"></input>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <label>To: </label>
                            <input type="time"></input>
                            <input type="date"></input>
                        </div>
                        <div style={{marginTop: "25px", textAlign: "right"}}>
                            <button className="btn bikes__button">
                                Show Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Filters