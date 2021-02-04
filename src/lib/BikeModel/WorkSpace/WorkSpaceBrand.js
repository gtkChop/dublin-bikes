import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle } from '@fortawesome/fontawesome-free-solid'

function WorkSpaceBrand() {
    return (
        <>
            <div className="bikes__brand_container">
                <div className="bikes__brand title">
                    <span className="text">DUBLIN</span>
                    <FontAwesomeIcon className="text" icon={faBicycle} size="sm" style={{paddingLeft: "5px"}}/>
                </div>
                <div className="bikes__sub_brand title">
                    <span className="text">BIKES</span>
                </div>
                
            </div>
        </>
    )
}

export default WorkSpaceBrand