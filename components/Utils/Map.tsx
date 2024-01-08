import { useEffect, useRef, useMemo } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import Button from "@mui/material/Button";
import { MapStyle } from "./MapStyle";
interface MapGoogleProps {
    address: string;
    setLatLngElevation?: (lat: number, lng: number, altitude: number) => void;
    lat: number;
    lng: number;
    interactive: boolean;
    staticElevation: boolean;
    elevation?: number;
}
function MapGoogle({ address, setLatLngElevation, lat, lng, interactive = true, staticElevation = false, elevation }: MapGoogleProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const loader = new Loader({
        apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["maps", "geocoding"]
    });
    useEffect(() => {
        loader.load().then(() => {
            if (address !== "") {
                const geocoder = new google.maps.Geocoder();
                const elevator = new google.maps.ElevationService();
                const infowindow = new google.maps.InfoWindow({});
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === "OK" && results !== null) {
                        const map = new google.maps.Map(mapRef.current!, {
                            center: results[0].geometry.location,
                            zoom: 12,
                            styles: MapStyle,
                            streetViewControl: false,
                            zoomControl: interactive,
                            disableDoubleClickZoom: !interactive,
                            scrollwheel: interactive,
                            gestureHandling: interactive ? "auto" : "none",
                            clickableIcons: false,
                        });
                        infowindow.open(map);
                        displayLocationElevation(results[0].geometry.location, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                        if (interactive) {
                            map.addListener("click", (event: any) => {
                                displayLocationElevation(event.latLng, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                            });
                        }
                    } else {
                        console.error(`Geocode was not successful for the following reason: ${status}`);
                    }
                });
            }
        });
    }, [address, loader]);
    useEffect(() => {
        loader.load().then(() => {
            if (lat !== undefined && lng !== undefined) {
                const geocoder = new google.maps.Geocoder();
                const elevator = new google.maps.ElevationService();
                const infowindow = new google.maps.InfoWindow({});
                geocoder.geocode({ location: new google.maps.LatLng(lat, lng) }, (results, status) => {
                    if (status === "OK" && results !== null) {
                        const map = new google.maps.Map(mapRef.current!, {
                            center: results[0].geometry.location,
                            zoom: 12,
                            styles: MapStyle,
                            streetViewControl: false,
                            zoomControl: interactive,
                            disableDoubleClickZoom: !interactive,
                            scrollwheel: interactive,
                            gestureHandling: interactive ? "auto" : "none", clickableIcons: false,
                        });
                        infowindow.open(map);
                        displayLocationElevation(results[0].geometry.location, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                        if (interactive) {
                            map.addListener("click", (event: any) => {
                                displayLocationElevation(event.latLng, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                            });
                        }
                    } else {
                        console.error(`Geocode was not successful for the following reason: ${status}`);
                    }
                });
            }
        });
    }, [lat, lng, loader]);

    const getGeolocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const latLng = new google.maps.LatLng(latitude, longitude);
                    const elevator = new google.maps.ElevationService();
                    const infowindow = new google.maps.InfoWindow({});
                    const map = new google.maps.Map(mapRef.current!, {
                        center: latLng,
                        zoom: 12,
                        styles: MapStyle,
                        streetViewControl: false,
                        zoomControl: interactive,
                        disableDoubleClickZoom: !interactive,
                        scrollwheel: interactive,
                        gestureHandling: interactive ? "auto" : "none", clickableIcons: false,
                    });
                    infowindow.open(map);
                    displayLocationElevation(latLng, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                    if (interactive) {
                        map.addListener("click", (event: any) => {
                            displayLocationElevation(event.latLng, elevator, infowindow, setLatLngElevation, staticElevation, elevation);
                        });
                    }
                },
                (error) => {
                    console.error(`Error getting user location: ${error.message}`);
                }
            );
        } else {
            console.error('Geolocation is not available in this browser.');
        }
    };

    return <>
        {interactive && <Button onClick={getGeolocation}>Ubicación Actual</Button>}
        <div style={{ height: "400px" }} ref={mapRef} >
        </div>
    </>;
}
function displayLocationElevation(
    location: google.maps.LatLng,
    elevator: google.maps.ElevationService,
    infowindow: google.maps.InfoWindow,
    setLatLngAltitude?: (lat: number, lng: number, altitude: number) => void,
    staticElevation: boolean = false,
    elevation?: number
) {
    if (staticElevation) {
        var eleva = elevation !== undefined ? elevation : 0;
        infowindow.setPosition(location);
        infowindow.setContent(
            "Altitud: " + eleva.toFixed(2) + " m s.n.m.",
        );
    } else {
        elevator
            .getElevationForLocations({
                locations: [location],
            })
            .then(({ results }) => {
                infowindow.setPosition(location);
                // Retrieve the first result
                if (results[0]) {
                    if (setLatLngAltitude !== undefined)
                        setLatLngAltitude(location.lat(), location.lng(), results[0].elevation);
                    infowindow.setContent(
                        "Altitud: " +
                        results[0].elevation.toFixed(2) +
                        " m s.n.m.",
                    );
                } else {
                    infowindow.setContent("No results found");
                }
            })
            .catch((e) =>
                infowindow.setContent("Elevation service failed due to: " + e),
            );
    }
}
export default MapGoogle;