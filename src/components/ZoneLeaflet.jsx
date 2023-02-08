import React, { useState } from 'react';
import { MapContainer, useMapEvents, TileLayer, Marker, Popup } from 'react-leaflet';
import Geocode from "react-geocode";
import { HashLoader } from 'react-spinners';
import { override } from '../Helpers/spinnercss';
import { useDispatch } from 'react-redux';
import { mapCoordinates } from '../reduxToolkit/UpdateCompany/UpdateCompanySlice';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

function AddMarkerToClick({ latlng, setLatitude, setLongitude }) {
    const [markers, setMarkers] = useState(latlng);
    const dispatch = useDispatch();

    const map = useMapEvents({
        click(e) {

            setMarkers([
                e.latlng.lat,
                e.latlng.lng
            ]);
            setLatitude(e.latlng.lat)
            setLongitude(e.latlng.lng)
            // AIzaSyDez0zzXX1CKyVOrcoCZLzNToqv8BqPjKE
            Geocode.setApiKey("AIzaSyDRCcydEnjt7P-riOx4X-Dm4F1HDntPEDg");
            Geocode.fromLatLng(e.latlng.lat, e.latlng.lng).then(
                (response) => {
                    const body = {
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    }
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

const ZoneLeaflet = ({ latlng, setLatitude, setLongitude }) => {

    return (
        <>
            {
                // latlng[0] !== undefined ?
                <MapContainer
                    center={latlng}
                    zoom={6}
                    style={{ height: "14rem", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <AddMarkerToClick latlng={latlng}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude} />
                </MapContainer>
                //  :
                // <div className="overlay">
                //     <HashLoader loading="true" css={override} size={50} color="#fff" />
                // </div>
            }
        </>
    )
}

export default ZoneLeaflet
