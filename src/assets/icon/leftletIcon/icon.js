import L from 'leaflet';

const iconBlue = new L.Icon({
    iconUrl: require('./marker-icon.png'),
    iconRetinaUrl: require('./marker-icon.png'),
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
    autoPan: false



});


const iconGreen = new L.Icon({
    iconUrl: require('./marker-icon-2x-green.png'),
    iconRetinaUrl: require('./marker-icon-2x-green.png'),
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});



export { iconBlue, iconGreen };