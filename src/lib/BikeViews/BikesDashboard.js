import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Workspace from './WorkSpace/Workspace';
import geojsonData from '../../wwwroot/stationsGeojson.json';
import allStations from '../../wwwroot/allStations.json';
import {addMapDataControlsEvents} from '../BikeModel/utils'
import BikesAvailability from '../BikeModel/HistoricalData/BikesAvailability'
import FiltersModel from '../BikeModel/HistoricalData/FiltersModel'


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
            showCurrentAvailability: props.showCurrentAvailability || false,
            historicalFormData: props.historicalFormData || {}
        }
    }

    handleHistoricalFormData = (data) => {
        this.setState({
            historicalFormData: data
        })
    }

    workSpaceToggleHandler = () => {
        this.setState(prevState => {
            return {workSpaceToggleState: !prevState.workSpaceToggleState}
        })
    }

    locationInMapEvent = (e) => {
        const value = e.target.value
        const eventData= JSON.parse(value)
        this.map.flyTo({
            center: [eventData.st_LONGITUDE, eventData.st_LATITUDE,],
            speed: 1,
            zoom: 18 
        }) 
        this.setState(prevState => {
            return {
                selectedStationeventData: eventData,
                showCurrentAvailability: true
            }
        })
    }

    mapClickEvent = (eventData) => {
        this.setState(prevState => {
            return {
                selectedStationeventData: eventData,
                showCurrentAvailability: true
            }
        })
    }

    bikeStatusCloseHandler = () => {
        this.setState({
            showCurrentAvailability: false
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
        addMapDataControlsEvents(geojsonData, this.map, this.state.config, this.mapClickEvent)
    }

    componentWillUnmount() {
        this.map.remove();
    }

    render() {
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
                    handleHistoricalFormData={this.handleHistoricalFormData}
                />
                {
                    this.state.showCurrentAvailability ?
                    <BikesAvailability 
                        selectedStationData={this.state.selectedStationeventData} 
                        config={this.state.config}
                        udateData={this.state._updateBikeAvailability}
                        closeHandler={this.bikeStatusCloseHandler}>
                    </BikesAvailability>
                    :null
                }
                {
                    (Object.keys(this.state.historicalFormData).length > 0) ?
                        <FiltersModel formData={this.state.historicalFormData} config={this.state.config} />
                    :null
                }
            </>
        )
    }
}

export default BikesDashBoard
