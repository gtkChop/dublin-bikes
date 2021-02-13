import React from 'react'
import WindIcon from '../../assets/wind.svg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTint, faDotCircle, faCloud} from '@fortawesome/fontawesome-free-solid'

function WeatherForecast (props) {

    const getHourlyWeathrForecast = () => {
        var hourly = []
        var counter = 0
        for (var i=0; i < props.hourly.length; i++) {
            var item = props.hourly[i]
            if (counter === props.noItems) {
                break
            }
            if (typeof item.dt !== 'string') {
                const datetime = new Date(item.dt.toString() * 1000)
                item.dt = datetime.toGMTString()
                hourly.push(item)
                counter ++
            }
        }
        return hourly
    }

    return (
        <>
        <div className="bikes__weather_forecast" style={{marginTop: "30px"}}>
            <h5 className="text-center">Forecast</h5>
            <div className="bikes__weather_forecast_section" style={{display: "flex"}}>
            {
                getHourlyWeathrForecast().map((item, index) => {
                    return (
                        <div key={index} className="bikes__weather_forcast">
                            <div className="bikes__weather_forcast_header">
                                <div className="bikes__cloud_link" style={{justifyContent: "center", display: "flex"}}>
                                    <FontAwesomeIcon icon={faCloud} size="lg" style={{marginRight: "10px"}}/>
                                    <h5>{item.temp} &#176;C</h5>
                                </div>
                                <div style={{fontSize: "12px"}}>
                                    {item.dt}
                                </div>
                            </div>
                            <div className="bikes__weather_forcast_body">
                                <div>
                                    <img src={WindIcon} alt="Current wind" style={{width:"15px", marginRight:"5px"}}></img>
                                    <small style={{paddingRight: "10px"}}>{item.wind_speed} m/s NW</small>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faTint} size='sm' style={{marginRight:"5px", marginTop: "5px"}}/>
                                    <small style={{paddingRight: "10px"}}>{item.humidity} %</small>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faDotCircle} size='sm' style={{marginRight:"5px", marginTop: "5px"}}/>
                                    <small style={{paddingRight: "10px"}}>{item.pressure} mm Hg</small>
                                </div>
                                <div>
                                    <b><p style={{margin: "0"}}>{item.weather[0].description}</p></b>
                                </div>

                            </div>
                        </div>
                    )
                })

            }
            </div>
        </div>
        </>
    )
}

export default WeatherForecast