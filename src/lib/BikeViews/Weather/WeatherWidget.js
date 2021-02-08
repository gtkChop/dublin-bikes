import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faInfoCircle } from '@fortawesome/fontawesome-free-solid'
import TodaysWeather from '../../BikeModel/Weather/TodaysWeather'

function WeatherWidget(props) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="bikes__weather">
            <button className="btn btn-link" onClick={handleShow}>
                <FontAwesomeIcon icon={faCloud} style={{marginRight: "10px"}}/>
                Weather
            </button>

            <Modal 
                show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="bikes__weather_modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: "10px"}}/>
                        Today's Weather
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TodaysWeather config={props.config}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default WeatherWidget