import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/fontawesome-free-solid'
import WorkSpaceIcon from '../../BikeModel/WorkSpace/WorkSpaceIcon'
import WorkSpaceBrand from '../../BikeModel/WorkSpace/WorkSpaceBrand'
import BikeSations from './BikeStations'
import Filters from './Filters'

function Workspace(props) {

    return (
    <>
        <WorkSpaceIcon clickEvent={props.workSpaceToggleHandler} isShow={props.workSpaceToggleState}/>
        <div className= {!props.workSpaceToggleState? "Workspace__container": "Workspace__container bike__component_hide"}>
            <button 
                className="btn btn-link workspace__toggle" 
                onClick={() => props.workSpaceToggleHandler()}
            >
                <FontAwesomeIcon icon={faAngleDoubleRight} size="lg"/>
            </button>
            <div className="workspace__controls">
                <WorkSpaceBrand />
                <BikeSations config={props.config} data={props.data} locationInMapEvent={props.locationInMapEvent}/>
                <Filters allStations={props.data}/>
            </div>
        </div>
    </>
    )
}

export default Workspace