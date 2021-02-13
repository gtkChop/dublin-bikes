import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import Workspace from './WorkSpace/Workspace';
import geojsonData from '../../wwwroot/stationsGeojson.json';
import allStations from '../../wwwroot/allStations.json';
import {addMapDataControlsEvents} from '../BikeModel/utils'
import BikesAvailability from '../BikeModel/HistoricalData/BikesAvailability'
import FiltersModel from '../BikeModel/HistoricalData/FiltersModel'
import About from './About/About'
import ResetMapView from './Map/ResetMapView'
import WeatherWidget from './Weather/WeatherWidget';
import LayerControl from './Map/LayerControl';


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
            historicalFormData: props.historicalFormData || {},
            showhistoricalData: props.showhistoricalData || false
        }
    }

    switchBaseStyles = (layer, afterFunction=null) => {
        this.setState({
            baseLayer: layer
        }, () => {
            try{
                this.map.remove()
            } catch(e) {
                console.log("This is unexpected")
                console.error(e)
            }
            this.initializeMap();
            if (afterFunction) {
                afterFunction()
            }
        })
    }

    handleCloseOpenHistoricalDataPane = (val) => {
        this.setState({
            showhistoricalData: val
        })
    }

    handleHistoricalFormData = (data) => {
        this.setState({
            historicalFormData: data,
            showhistoricalData: true
        })
    }

    handleMapReset = () => {
        this.map.flyTo({
            center: [this.state.config.map.initLng, this.state.config.map.initLat],
            speed: 1,
            zoom: this.state.config.map.initZoom 
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
            center: [eventData.st_LONGITUDE, eventData.st_LATITUDE],
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

    initializeMap() {
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
    
    componentDidMount(){
        this.initializeMap()
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
                        <FiltersModel 
                            formData={this.state.historicalFormData} 
                            config={this.state.config}
                            handleCloseOpenHistoricalDataPane={this.handleCloseOpenHistoricalDataPane}
                            showhistoricalData={this.state.showhistoricalData}
                        />
                    :null
                }
                <div className="bikes__widgets_nav">
                    <LayerControl config={this.state.config} switchBaseStyles={this.switchBaseStyles} baseLayer={this.state.baseLayer}/>
                    <ResetMapView handleMapReset={this.handleMapReset}/>
                    <WeatherWidget config={this.state.config}/>
                    <About />
                </div>
            </>
        )
    }
}

export default BikesDashBoard
