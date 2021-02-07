import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
import {getDifferenceBetweenDates} from '../../BikeModel/utils'

function Filters(props) {
    const [stations, setStations] = useState([])
    const [FromDate, setFromDate] = useState({"date": "", "time": "00:00"})
    const [ToDate, setToDate] = useState({"date": "", "time": "00:00"})
    const [errorMsg, setErrorMsg] = useState("")
    const [selectedOption, setSelectedOption] = useState(null)

    const closeErrorMessageHandler = () => {
        setErrorMsg("")
    }

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
    
    const handleFromDate = (e, type) => {
        setFromDate(prevFromDate => {
            var newState = {...prevFromDate}
            newState[type] = e.target.value
            return newState
        })
    }

    const handleToDate = (e, type) => {
        setToDate(prevToDate => {
            var newState = {...prevToDate}
            newState[type] = e.target.value
            return newState
        })
    }
    
    const formSubmitHandler = (e) => {
        e.preventDefault()

        if (selectedOption === null){
            setErrorMsg("Please select a station.")
            return null
        }
        if ((selectedOption === null) || (!Object.keys(selectedOption) > 0)) {
            setErrorMsg("Please select a station.")
            return null
        }
        if (!FromDate.date) {
            setErrorMsg("Please select a form date.")
            return null
        }
        if (!ToDate.date) {
            setErrorMsg("Please select a to date.")
            return null
        }

        if (getDifferenceBetweenDates(FromDate.date, ToDate.date) < 0) {
            setErrorMsg("From date cannot be graeater that to date.")
            return null
        }

        props.handleHistoricalFormData({
            from: `${FromDate.date.replaceAll("-", '')}${FromDate.time.replaceAll(":", "")}`,
            to: `${ToDate.date.replaceAll("-", '')}${ToDate.time.replaceAll(":", "")}`,
            station: selectedOption
        })
    }
      
    return (
        <>
        <h4 style={{textAlign: "center", marginBottom: "0px", marginTop: "10px"}}>Historical Data</h4>
        <hr></hr>
        <div className="bike__stations bikes__component">
            <div className="bikes__component">
                <div className="bikes__historical_filter">
                    <p style={{marginBottom: "0"}}>Select the station and dates to view the historical data. 
                    Please note only a max period of 3 days can be selected</p>
                    <form>
                        {
                            errorMsg?
                            <div className="alert alert-danger" role="alert" style={{padding: "2px", fontSize: "15px", textAlign: "center"}}>
                                {errorMsg}
                                <button 
                                    className="btn btn-link" 
                                    style={{padding: "0", float: "right", color: "#721c24", paddingRight: "10px"}}
                                    onClick={() => closeErrorMessageHandler()}>
                                    <FontAwesomeIcon icon={faTimes} size="sm"/>
                                </button>
                            </div>
                            : null
                        }
                        
                        <div style={{marginTop: "15px"}}>
                            <label>* Station: </label>
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
                            <label>* From: </label>
                            <input type="time" value={FromDate.time} onChange={(e) => handleFromDate(e, "time")}></input>
                            <input type="date" value={FromDate.date} onChange={(e) => handleFromDate(e, "date")}></input>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <label>* To: </label>
                            <input type="time" value={ToDate.time} onChange={(e) => handleToDate(e, "time")}></input>
                            <input type="date" value={ToDate.date} onChange={(e) => handleToDate(e, "date")}></input>
                        </div>
                        <div style={{marginTop: "25px", textAlign: "right"}}>
                            <button className="btn bikes__button" type="submit" onClick={formSubmitHandler}>
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