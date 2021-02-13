import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/fontawesome-free-solid'
import TodaysWeather from '../../BikeModel/Weather/TodaysWeather'

function WeatherWidget(props) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="layer_control">
            <button className="btn btn-link widget_nav" onClick={handleShow}>
                <FontAwesomeIcon icon={faCloud} style={{marginRight: "5px"}}/>
                Today's Weather
            </button>

            <Modal 
                show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="bikes__weather_modal"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <TodaysWeather config={props.config}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default WeatherWidget