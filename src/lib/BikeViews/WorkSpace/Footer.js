import React from 'react'

function Footer (props) {
    return (
        <div className="bikes__footer" style={{position:"absolute", bottom: "5px", color: "grey"}}>
            <div>
                <i><small>
                    <strong>Disclaimer: </strong>The data shown in this dashboard is from the API (please see about). 
                    Hence correctness of the data is not garaunteed. Please use this for reference only.
                </small></i>
            </div>
        </div>
    )
}

export default Footer