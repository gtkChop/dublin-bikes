function extractStateFromUrl() {
    //var queryString = currentUrl.search;
    var urlHash =  decodeURIComponent(window.location.hash).substr(1);
    var dashState = {}
    try {
        if (urlHash) {
            dashState = JSON.parse(urlHash)
            delete dashState.config
        }
    } catch(e) {
        console.warn("Url Parse Error. Failed to extract state from URL")
    }
    console.log(dashState)
    return dashState
}

function getCurrentStateObject(currentState, mapObject) {
    const blackListItems = [
        'config',
        'lat',
        'lng',
        'baseLayer'
    ]
    var propsObject = {}

    Object.keys(currentState).map(key => {
        var isInclude = !blackListItems.includes(key)
        if (isInclude) {
            propsObject[key] = currentState[key]
        }
        return null
    })

    var center = mapObject.getCenter()
    propsObject.lat = center.lat
    propsObject.lng = center.lng
    propsObject.zoom = mapObject.getZoom()
    propsObject.baseLayer = mapObject.getStyle().sprite
    return propsObject
}

function getShareUrl(currentState, mapObject) {
    var currentStateData = getCurrentStateObject(currentState, mapObject)
    currentStateData = JSON.stringify(currentStateData)
    const host = `${window.location.protocol}//${window.location.host}`
    return encodeURI(`${host}/share/init#${currentStateData}`)
} 

function isShareUrl() {
    const currentUrl = new URL(decodeURIComponent(window.location.href))
    const pathname = currentUrl.pathname
    if ((pathname) && pathname.includes('/share/')) {
        return true
    }
    return false
}

export {
    extractStateFromUrl,
    getCurrentStateObject,
    getShareUrl,
    isShareUrl
}
