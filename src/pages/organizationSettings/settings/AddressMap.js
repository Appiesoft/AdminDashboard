import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const AddressMap = (props) => {
    const onMarkerDragEnd = (coords) => {
        const { latLng } = coords;
        props.setMapCoord({lat:latLng.lat(),lng:latLng.lng()});
    };
    const mapStyles = {
        width: 'auto',
        height: '300px',
        position: 'relative',
    };
    return (
        <Map google={props.google} zoom={14} initialCenter={props?.center} style={mapStyles}>
            <Marker draggable={true} position={props?.center} onDragend={(t, map, coords) => onMarkerDragEnd(coords)} />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDsucrEdmswqYrw0f6ej3bf4M4suDeRgNA',
})(AddressMap);
