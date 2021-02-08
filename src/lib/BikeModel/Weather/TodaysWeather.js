import React, {useEffect, useState} from 'react';
import WindIcon from '../../assets/wind.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTint, faDotCircle, faCloud} from '@fortawesome/fontawesome-free-solid'

function TodaysWeather(props){

    const [weatherData, setWeatherData] = useState({"weather": {}, "error": ""})
    
    useEffect(() => {
        const weatherEndpoint = `${props.config.weatherAPI.url}?lat=${props.config.map.initLat}&lon=${props.config.map.initLng}&appid=${props.config.weatherAPI.accessToken}&units=metric`
        console.log(weatherEndpoint)
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            }

        fetch(`${weatherEndpoint}`, {
                method: "GET",
                headers: headers
            })
            .then(response => response.json())
            .then(weatherData => {
               console.log(weatherData)
               setWeatherData({
                    weather: {
                        current: weatherData.current,
                        hourly: weatherData.hourly,
                        currentHourData: weatherData.hourly[0]
                    },
                    error: ""
               })
            })
            .catch(error => {
                console.warn(error)
                setWeatherData({
                    weather: {},
                    error: "Error when trying to fetch current weather."
                })
            })
    }, [props.config.weatherAPI.weatherEndPoint, props.config.map.initialLat, props.config.weatherAPI.accessToken])

    const dateString = () => {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        let today = new Date()
        return today.toLocaleDateString("en-US", options)
    }

    if (Object.keys(weatherData.weather).length > 0) {
        return (
            <div className="fluid-container">
                <h6 className="text-center">{dateString()}</h6>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <FontAwesomeIcon icon={faCloud} size='2x' style={{paddingRight: "10px"}}/>
                    <h2>{weatherData.weather.current.temp} &#176;C</h2>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h6> Feels Like {weatherData.weather.current.feels_like} C</h6>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
    
                    <img src={WindIcon} alt="Current wind" style={{width:"15px", paddingRight:"5px"}}></img>
                    <small style={{paddingRight: "10px"}}>{weatherData.weather.current.wind_speed} m/s NW</small>
    
    
                    <FontAwesomeIcon icon={faTint} size='sm' style={{paddingRight:"5px", paddingTop: "5px"}}/>
                    <small style={{paddingRight: "10px"}}>{weatherData.weather.current.humidity} %</small>
    
                    <FontAwesomeIcon icon={faDotCircle} size='sm' style={{paddingRight:"5px", paddingTop: "5px"}}/>
                    <small style={{paddingRight: "10px"}}>{weatherData.weather.current.pressure} mm Hg</small>
    
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <p style={{margin: "0"}}>{weatherData.weather.current.weather[0].description}</p>
                </div>
    
            </div>
        )
    }

    if (weatherData.error) {
        return (
            <div className="fluid-container">
                <h6 className="text-center">{dateString()}</h6>
                Error: {weatherData.error}
            </div>
        )
    }

    return (
        <div className="fluid-container">
            <h6 className="text-center">{dateString()}</h6>
            Loading ....
        </div>
    )
}

export default TodaysWeather