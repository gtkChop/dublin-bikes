import mapboxgl from 'mapbox-gl';

function FuzzyMatch (val, s) {
    /* 
        Match fuzzy returns boolean
    */
    var hay = val.toLowerCase(), i = 0, n = -1, l;
    s = s.toLowerCase();
    for (; l = s[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false;
    return true
}

function TitleCase(value) {
    /* 
        Convert string to title
    */    
    return value.toString().toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

function ConfigLoader(config){
    /* 
        Config loader checks required property
    */
    const requiredKeys = [
        "map",
        "weatherAPI",
        "bikesAPI",
        "appConfig"
    ]
    if (!Object.keys(config).length) {
        throw new Error("Configuration parsing error. No config given")
    }
    requiredKeys.map(configKey => {
        if (!config.hasOwnProperty(configKey)){
            throw new Error(`Config doesnt contain: ${configKey}`)
        }
        return null
    })

    return {...config}

}

function addLayers(layers, map){
    // Add all layers
    for (var i=0; i<layers.length; i++){
        map.addLayer(layers[i])
    }
}

function clusterClickEvent(map) {
    // Click on cluster
    map.on('click', 'stations', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
        layers: ['stations']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('stations').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;
                if (!zoom) return;
                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });
}

function unClusteredClickEvent(map, clickEventHandler) {
    map.on('click', 'unclustered-point', function (e) { 
        var properties = e.features[0].properties
        clickEventHandler(properties)
    })
}

function addMapDataControlsEvents(geojsonData, map, config, clickEventHandler) {
    // Add map controls
    map.on('load', function(){
        map.addSource('stations', {
            type: "geojson",
            data: geojsonData,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 
        });
        map.scrollZoom.disable();
        addLayers(config.map.layers, map)
        clusterClickEvent(map)
        unClusteredClickEvent(map, clickEventHandler)
        map.on('mouseenter', 'clusters', function () {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', function () {
            map.getCanvas().style.cursor = '';
        });
        
    })
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
}

function convertDateToString(d){

    return d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+
        ("0" + d.getDate()).slice(-2)+("0" + d.getHours()).slice(-2)+
        ("0" + d.getMinutes()).slice(-2);
}

function getCurrentDateDiffHours(subhours=0) {
    var currentDate = new Date()
    var diffDate = new Date()
    diffDate.setHours(diffDate.getHours() - subhours)
    return {
        currentDate: convertDateToString(currentDate),
        diffDate: convertDateToString(diffDate)
    }
}

function getDifferenceBetweenDates(date1, date2, inHours=false) {
    var d1 = new Date(date1);
    var d2 = new Date(date2);
    const diffTime = d2 - d1;
    if (inHours) {
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60)); 
        return diffDays
    }
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays
}

function getShortDateTime(val) {
    const date = new Date(val)
    const cleanVal = `${date.getDay()}/${date.getMonth()}@ ${date.getHours()}:${date.getMinutes()} hrs`
    return cleanVal
}

export {
    FuzzyMatch,
    TitleCase,
    ConfigLoader,
    addMapDataControlsEvents,
    getCurrentDateDiffHours,
    getDifferenceBetweenDates,
    getShortDateTime
}
