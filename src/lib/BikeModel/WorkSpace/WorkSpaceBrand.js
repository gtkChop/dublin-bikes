import React from 'react'
import BikesLogo from '../../assets/bikes_logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/fontawesome-free-solid'

function WorkSpaceBrand() {
    return (
        <>
            <div className="bikes__brand_container">
                <img src={BikesLogo} alt="Dublin bikes logo"/>
                <FontAwesomeIcon className="text" icon={faBicycle} size="lg"/>
            </div>
        </>
    )
}

export default WorkSpaceBrand