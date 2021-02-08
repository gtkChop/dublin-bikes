import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBug, faEnvelope } from '@fortawesome/fontawesome-free-solid'

function About(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="bikes__about">
            <button className="btn btn-link" onClick={handleShow}>
                <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: "5px"}} size="sm"/>
                About
            </button>

            <Modal 
                show={show} 
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90w"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faInfoCircle} style={{marginRight: "10px"}}/>
                    About
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="bikes__about_description">
                        <p className="text-justify">
                        The is the dashboard for dublin bikes. 
                        All the data are fetched from an API and shown near realtime information. 
                        This is a open source project done out of curiosity. Any contribution is welcome.
                        </p>
                    </div>
                    <div className="bikes__about_resources">
                        <h6>
                            Data Resources:
                        </h6>
                        <p>
                            All the bikes near real time data is taken from 
                            <a className="bikes__link"href="https://data.smartdublin.ie" target="_blank" rel="noreferrer">
                                {' data.smartdublin.ie'}
                            </a>
                        </p>
                        <ul>
                            <li>
                                <a className="bikes__link"href="https://data.smartdublin.ie/dataset/dublinbikes-api" target="_blank" rel="noreferrer">
                                    Dublin Bikes
                                </a>
                            </li>
                            <li>
                                <a className="bikes__link"href="https://data.smartdublin.ie/dataset/dublinbikes-api" target="_blank" rel="noreferrer">
                                    Moby Bikes
                                </a>
                            </li>
                            <li>
                                <a className="bikes__link"href="https://data.smartdublin.ie/dataset/dublinbikes-api" target="_blank" rel="noreferrer">
                                    Bleeper Bikes
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="bikes__about_contact">
                        <h6>
                            Contact:
                        </h6>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} style={{marginRight: "10px"}}/>
                            dashboarddublinbikes@gmail.com
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBug} style={{marginRight: "10px"}}/>
                            Log any bugs found 
                            <a className="bikes__link"href="https://github.com/gtkChop/dublin-bikes/issues" target="_blank" rel="noreferrer">
                                {' '}here.
                            </a>   
                        </div>
                    </div>
                    
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default About