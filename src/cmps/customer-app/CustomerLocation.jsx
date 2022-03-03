import { useState, memo, useCallback} from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { API_KEY } from '../../../my.js';


const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 3.745,
    lng: 38.523
};

const CustomerLocation = ({ address }) => {

    const [map, setMap] = useState(null)
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                const marker = new window.google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        setMap(map)
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <section className='map-container'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                <></>
            </GoogleMap>

        </section>
    ) : <div>Map cannot be loaded right now, sorry.</div>


}

export default memo(CustomerLocation)