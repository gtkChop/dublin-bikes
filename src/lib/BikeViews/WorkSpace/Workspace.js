import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/fontawesome-free-solid'
import WorkSpaceIcon from '../../BikeModel/WorkSpace/WorkSpaceIcon'
import WorkSpaceBrand from '../../BikeModel/WorkSpace/WorkSpaceBrand'
import BikeSations from './BikeStations'

function Workspace(props) {

    return props.workSpaceToggleState ? 
    <WorkSpaceIcon clickEvent={props.workSpaceToggleHandler}/>:
    (
        <div className="Workspace__container">
            <button 
                className="btn btn-link workspace__toggle" 
                onClick={() => props.workSpaceToggleHandler()}
            >
                <FontAwesomeIcon icon={faAngleDoubleRight} size="lg"/>
            </button>
            <div className="workspace__controls">
                <WorkSpaceBrand />
                <BikeSations config={props.config} data={props.data} locationInMapEvent={props.locationInMapEvent}/>
            </div>
        </div>
    )
}

export default Workspace