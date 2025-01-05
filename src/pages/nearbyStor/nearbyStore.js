import React, { useState, useRef } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import './nearbyStore.css';
import markerIcon from '../../asset/mark.png';

const mapContainerStyle = {
    width: '100%',
    height: '100%', // Ensure it takes full height
};

const center = {
    lat: 19.0760, // Default center (Mumbai)
    lng: 72.8777,
};

const stores = [
    { id: 1, name: "VUJAY SALES", address: "48, Jaya Vinayagar Kovil St, New Colony, Jaya Nagar, Porur, Mumbai, 400005", lat: 19.2307, lng: 72.8567, status: "Open" },
    { id: 2, name: "D Mart", address: "48, Jaya Vinayagar Kovil St, New Colony, Jaya Nagar, Porur, Mumbai, 400005", lat: 19.2066, lng: 72.8415, status: "Closed" },
    { id: 3, name: "Sai Baba Nagar", address: "Kandivali East", lat: 19.2136, lng: 72.8671, status: "Open" },
    { id: 4, name: "Growel's 101 Mall", address: "Akurli Road", lat: 19.2183, lng: 72.8625, status: "Open" },
    { id: 5, name: "Namaha Hospital", address: "Kandivali West", lat: 19.2081, lng: 72.8443, status: "Closed" },
    { id: 6, name: "Big Bazaar", address: "Malad", lat: 19.1881, lng: 72.8483, status: "Open" },
    { id: 7, name: "Reliance Fresh", address: "Andheri", lat: 19.1181, lng: 72.8383, status: "Open" },
    { id: 8, name: "Hypercity", address: "Goregaon", lat: 19.1581, lng: 72.8483, status: "Closed" },
    { id: 9, name: "Shoppers Stop", address: "Bandra", lat: 19.0581, lng: 72.8383, status: "Open" },
    { id: 10, name: "Inorbit Mall", address: "Vashi", lat: 19.0781, lng: 72.9983, status: "Open" },
];

const LocationPage = () => {
    const [selectedStore, setSelectedStore] = useState(stores[0]);
    const [mapCenter, setMapCenter] = useState(center);
    const [zoom, setZoom] = useState(12); // Default zoom level
    const [isMapLoaded, setIsMapLoaded] = useState(false); // Track if the map is loaded
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const mapRef = useRef(null); // Ref to access the Google Map instance

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyB5GV0AxvGQOTRaomj95JE_8k5yejLMVYo", // Replace with your Google Maps API key
    });

    // Filter stores based on search query
    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStoreClick = (store) => {
        setSelectedStore(store);
        setMapCenter({ lat: store.lat, lng: store.lng });

        // Smooth transition to the new location
        if (mapRef.current) {
            mapRef.current.panTo({ lat: store.lat, lng: store.lng });
            setTimeout(() => {
                setZoom(16); // Zoom in after panning
            }, 500); // Adjust the delay as needed
        }
    };

    const onMapLoad = (map) => {
        mapRef.current = map; // Store the map instance in the ref
        setIsMapLoaded(true); // Mark the map as loaded

        // Force the map to resize
        setTimeout(() => {
            window.google.maps.event.trigger(map, 'resize');
        }, 0);

        // Create a bounds object to include all store locations
        const bounds = new window.google.maps.LatLngBounds();
        stores.forEach(store => {
            bounds.extend({ lat: store.lat, lng: store.lng });
        });

        // Fit the map to the bounds
        map.fitBounds(bounds);
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <div className="location-page-container">
            <div className="store-list">
                <h2 style={{textAlign:"justify"}}>Find a Nearby Stores</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search stores..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <ul>
                    {filteredStores.map((store) => (
                        <li
                            key={store.id}
                            className={selectedStore.id === store.id ? 'selected' : ''}
                            onClick={() => handleStoreClick(store)}
                        >
                            <div className="store-info">
                                <strong >{store.name}</strong>
                                <p style={{textAlign:"justify"}}>{store.address}</p>
                            </div>
                            <div className={`store-status ${store.status.toLowerCase()}` } style={{textAlign:"end"}}>
                                {store.status}
                            </div>
                          
                        </li>
                    ))}
                </ul>
            </div>
            <div className="map-container">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoom} // Dynamic zoom level
                    center={mapCenter} // Dynamic center
                    onLoad={onMapLoad}
                    options={{
                        mapTypeControl: false,
                        fullscreenControl: false,
                        streetViewControl: false,
                        zoomControl: true,
                    }}
                >
                    {isMapLoaded && // Render markers only after the map is loaded
                        stores.map((store) => (
                            <MarkerF
                                key={store.id}
                                title={store.name}
                                icon={{
                                    url: markerIcon,
                                    scaledSize: new window.google.maps.Size(28, 28), // Ensure `window.google` is available
                                }}
                                position={{ lat: store.lat, lng: store.lng }}
                                onClick={() => handleStoreClick(store)}
                            />
                        ))}
                </GoogleMap>
            </div>
        </div>
    );
};

export default LocationPage;