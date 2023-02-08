/*
 Author: @Rizwan ullah
 
 */
import React, { useState } from 'react';
import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";
import { HashLoader } from 'react-spinners';
import { override } from '../Helpers/spinnercss';
import { useDispatch } from 'react-redux';
import { mapCoordinates } from '../reduxToolkit/UpdateCompany/UpdateCompanySlice';

function AddMarkerToClick({ latlng }) {
    const [markers, setMarkers] = useState(latlng);
    const dispatch = useDispatch();

    const map = useMapEvents({
        click(e) {
            setMarkers([
                e.latlng.lat,
                e.latlng.lng
            ]);
            // AIzaSyDez0zzXX1CKyVOrcoCZLzNToqv8BqPjKE
            Geocode.setApiKey("AIzaSyDRCcydEnjt7P-riOx4X-Dm4F1HDntPEDg");
            Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    const body = {
                        address,
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    }
                    /*
                   

                    this function save map coordinates to redux store 
                    */
                    dispatch(mapCoordinates(body))
                    // console.log(address, e.latlng.lat, e.latlng.lng)
                },
                (error) => {
                    console.error(error);
                }
            );
        },
    })

    return (
        <>
            {
                <Marker
                    key={markers[0]}
                    position={markers}
                >
                    <Popup>Marker is at {markers}</Popup>
                </Marker>
            }
        </>
    )
}

const LefletMap = ({ latlng }) => {
    return (
        <>
            {
                // latlng[0] !== null ?
                <MapContainer
                    center={latlng}
                    zoom={4}
                    style={{ height: "250px", width: "100%", borderRadius: "5px" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <AddMarkerToClick latlng={latlng} />
                </MapContainer>
                //  :
                // <div className="overlay">
                //     <HashLoader loading="true" css={override} size={50} color="#fff" />
                // </div>
            }
        </>
    )
}

export default LefletMap
