import React from 'react';
import StationsTable from '../../BikeModel/WorkSpace/StationsTable'


function BikeStations(props) {
    const columns = [
            {id: "st_ID", label: "Id"},
            {id: "st_NAME", label: "Station Name"},
            {id: "st_ADDRESS", label: "Address"}
        ]
    return (
        <>
            <h4 style={{textAlign: "center", marginBottom:"0"}}>Bike Stations</h4>
            <hr></hr>
            <div className="bike__stations bikes__component">
                <StationsTable 
                    data={props.data} 
                    columns={columns} 
                    rowIdentifier={"st_ID"}
                    itemsPerPage={props.config.appConfig.itemsPerPageStationsTable}
                    locationInMapEvent={props.locationInMapEvent}
                />
            </div>
        </>
    )
}

export default BikeStations