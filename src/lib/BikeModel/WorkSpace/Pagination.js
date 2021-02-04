import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/fontawesome-free-solid'
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid'
import { faAngleRight } from '@fortawesome/fontawesome-free-solid'
import { faAngleDoubleRight } from '@fortawesome/fontawesome-free-solid'


function Pagination(props) {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{
                paddingRight: "15px"
            }}>
                Page {props.currentPage} out of {props.noOfPages}
            </div>
            <div>
                <button className="btn btn-link bikes__link_for_darkcomponent" onClick={() => props.paginationHandler("first")}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} size="sm" />
                </button>
                <button className="btn btn-link bikes__link_for_darkcomponent" onClick={() => props.paginationHandler("previous")}>
                    <FontAwesomeIcon icon={faAngleLeft} size="sm" />
                </button>
                <button className="btn btn-link bikes__link_for_darkcomponent" onClick={() => props.paginationHandler("next")}>
                    <FontAwesomeIcon icon={faAngleRight} size="sm" />
                </button>
                <button className="btn btn-link bikes__link_for_darkcomponent" onClick={() => props.paginationHandler("last")}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} size="sm" />
                </button>
            </div>
        </div>
    )
}

export default Pagination