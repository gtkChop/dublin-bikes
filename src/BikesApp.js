import 'bootstrap/dist/css/bootstrap.min.css'
import './lib/sass/bikes.scss'
import React, { useContext } from 'react'
import config from './wwwroot/config.json'
import { ConfigLoader } from './lib/BikeModel/utils'
import { configContext } from './lib/BikeModel/Context'
import BikesDashboard from './lib/BikeViews/BikesDashboard'

function AppWithContext() {
  const config = useContext(configContext)
  return <BikesDashboard config={config}/>
}

function BikesApp() {
    return (
      <div className="Bikes__App">
      <configContext.Provider value={ConfigLoader(config)}>
        <AppWithContext />
      </configContext.Provider>  
      </div>
    );
  }
  
  export default BikesApp;