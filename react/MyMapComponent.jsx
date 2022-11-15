import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import debug from "sabio-debug";

const _logger = debug.extend("Events"); //sabio:Events

const _loggerMap = _logger.extend("Map"); //sabio:Events:Map

function MyComponent(props) {
  const { event } = props;
  const markers = [
    {
      lat: event.event.event.latitude,
      lng: event.event.event.longitude,
    },
  ];
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: event.event.event.latitude,
    lng: event.event.event.longitude,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    _loggerMap(map);
    setMap(null);
  }, []);
  _loggerMap(map);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((item) => {
        return (
          <Marker
            key={item.lat}
            animation="DROP"
            position={{ lat: item.lat, lng: item.lng }}
          />
        );
      })}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
