import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Workspace from './WorkSpace/Workspace';
import geojsonData from '../../wwwroot/stationsGeojson.json';
import allStations from '../../wwwroot/allStations.json';
import {addMapDataControlsEvents} from '../BikeModel/utils'
import BikesAvailability from './CurrentStatus/BikesAvailability'


class BikesDashBoard extends Component {

    constructor(props) {
        super(props)
        this.mapRef = React.createRef();
        this.state = {
            config: props.config,
            lng: props.lng || props.config.map.initLng,
            lat: props.lat || props.config.map.initLat,
            zoom: props.zoom || props.config.map.initZoom,
            baseLayer: props.baseLayer || props.config.map.baseLayer,
            workSpaceToggleState: props.config.appConfig.defaultWorkSpaceToggled || false,
            selectedStationData: null,
            showCurrentAvailability: props.showCurrentAvailability || false
        }
    }

    workSpaceToggleHandler = () => {
        this.setState(prevState => {
            return {workSpaceToggleState: !prevState.workSpaceToggleState}
        })
    }

    locationInMapEvent = (e) => {
        const value = e.target.value
        const data= JSON.parse(value)

        this.map.flyTo({
            center: [data.st_LONGITUDE, data.st_LATITUDE,],
            speed: 1,
            zoom: 18 
        }) 
        this.setState(prevState => {
            return {
                selectedStationData: data,
                showCurrentAvailability: true
            }
        })
    }

    componentDidMount(){
        mapboxgl.accessToken = this.state.config.map.accessToken
        this.map = new mapboxgl.Map({
            container: this.mapRefContainer,
            style: this.state.baseLayer,
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            trackResize: true
        })
        addMapDataControlsEvents(geojsonData, this.map, this.state.config)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.workSpaceToggleState !== this.state.workSpaceToggleState) {
            this.map.resize()
        }
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
        console.log("**********")
        console.log(this.state)
        return (
            <>
                <div className="Map__container" ref={el => this.mapRefContainer = el}>
                </div>
                <Workspace 
                    config={this.state.config}
                    workSpaceToggleState={this.state.workSpaceToggleState}
                    workSpaceToggleHandler={this.workSpaceToggleHandler}
                    data={allStations}
                    locationInMapEvent={this.locationInMapEvent}
                />
                {
                    this.state.showCurrentAvailability ?
                    <BikesAvailability 
                        selectedStationData={this.state.selectedStationData} 
                        config={this.state.config}>
                    </BikesAvailability>
                    :null
                }
                
            </>
        )
    }
}

export default BikesDashBoard
