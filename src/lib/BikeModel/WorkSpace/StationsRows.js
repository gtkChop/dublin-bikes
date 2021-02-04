import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/fontawesome-free-solid'

function StationsRows(props) {
    return props.selectedData.map(row => {
        return (
        <tr key={row[props.rowIdentifier]}>
            {
                props.columns.map((column, idx) => {
                    if (idx === 0) {
                        return (
                        <td key={column.id}>
                            <button 
                                className="btn btn-link bikes__link_for_lightcomponent" 
                                style={{padding: "0"}}
                                value={JSON.stringify(row)}
                                onClick={(e) => props.locationInMapEvent(e)}
                            >
                                <FontAwesomeIcon icon={faCompass} size="sm" />&nbsp;{row[column.id]}
                            </button>
                        </td>
                        )
                    }
                    return <td key={column.id}>{row[column.id]}</td>
                })
            }
            <td key="location">
                
            </td>
        </tr>
        )
    })
}

export default StationsRows