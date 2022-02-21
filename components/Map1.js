import { useState } from 'react';
import Map from 'react-map-gl';
import { getCenter } from 'geolib';
import { Marker,Popup } from 'react-map-gl';
import { MapIcon } from '@heroicons/react/solid';

function Map1({searchResults}) {

     const [selectedLocation, setSelectedLocation] = useState({})

     // Transforming the search results object into required obj 
     const coordinates = searchResults.map((result)=>({
          longitude: result.long,
          latitude:result.lat
     }))

     const center = getCenter(coordinates)
     console.log(center)

     const [viewport, setViewport] = useState({
          longitude: center.longitude,
          latitude: center.latitude,
          zoom: 11,
          
     })

          console.log("Selected Location => ", selectedLocation)

     return (
          <div>
               <Map
                    mapStyle="mapbox://styles/suman119/ckzwrkaj8007i14rz25zd7ah2"
                    mapboxAccessToken= {process.env.mapbox_key}
                    {...viewport}
                    onMove = {(evt)=>setViewport(evt.viewState)}
                    // onViewportChange = {(nextViewport)=> setViewport(nextViewport)}
                    
               >
               
               {searchResults.map((result)=>(
                    <div
                    key={result.long} 
                    >

                   
                    <Marker
                     
                    latitude={result.lat}
                    longitude={result.long}
                    
                    >
                         <p onClick={()=>  setSelectedLocation(result)} className='cursor-pointer text-6xl animate-bounce'>❗</p>
                    </Marker>

                    {/* The popup to show after selecting a location   */}
                    {selectedLocation.long === result.long ? (
                         <Popup
                         closeOnClick={true}
                         onClose={()=> setSelectedLocation({})}
                         latitude={result.lat}
                         longitude={result.long}
                         >
                              {result.title}
                         </Popup>
                    ):(
                         false
                    )}
               </div>
               ))}
               

               </Map>
          </div>
     )
}

export default Map1