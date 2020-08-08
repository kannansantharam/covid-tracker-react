import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css';
import { showCirclesOnMap } from './util.js'
function Map({ center, zoom,countries,caseType }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                >

                </TileLayer>
                {countries.length && (showCirclesOnMap(countries,caseType))}
            </LeafletMap>
        </div>
    )
}

export default Map
