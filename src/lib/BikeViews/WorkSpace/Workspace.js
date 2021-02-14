import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/fontawesome-free-solid'
import { Transition } from 'react-transition-group'
import WorkSpaceIcon from '../../BikeModel/WorkSpace/WorkSpaceIcon'
import WorkSpaceBrand from '../../BikeModel/WorkSpace/WorkSpaceBrand'
import BikeSations from './BikeStations'
import Filters from './Filters'
import Footer from './Footer'

function Workspace(props) {

    const duration = 500
    const sidebarStyle = {
        transition: `opacity ${duration}ms`,
    }
    const sidebarTransitionStyles = {
        entering: { opacity: 0, visibility: "hidden"},
        entered: { opacity: 1, visibility: "visible"},
        exiting: { opacity: 1, visibility: "visible"},
        exited: { opacity: 0, visibility: "hidden"}
    }

    return (
    <>
        {
            props.workSpaceToggleState?
            <WorkSpaceIcon clickEvent={props.workSpaceToggleHandler}/>
            :null    
        }
        
        <Transition in={!props.workSpaceToggleState} timeout={duration}>
            {(state) => (
                <div className="Workspace__container" style={{...sidebarStyle, ...sidebarTransitionStyles[state]}}>
                    <button 
                        className="btn btn-link workspace__toggle" 
                        onClick={() => props.workSpaceToggleHandler()}
                        style={{...sidebarStyle, ...sidebarTransitionStyles[state]}}
                    >
                        <FontAwesomeIcon icon={faShare} size="lg"/>
                    </button>
                    <div className="workspace__controls">
                        <WorkSpaceBrand />
                        <BikeSations 
                            config={props.config} 
                            data={props.data} 
                            locationInMapEvent={props.locationInMapEvent}
                        />
                        <Filters 
                            allStations={props.data} 
                            config={props.config} 
                            handleHistoricalFormData={props.handleHistoricalFormData}
                            historicalFormData={props.historicalFormData}
                        />
                        <Footer config={props.config}/>
                    </div>
                </div>
            )}
        </Transition>
    </>
    )
}

export default Workspace