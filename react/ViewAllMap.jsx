import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import debug from "sabio-debug";

const _logger = debug.extend("Events"); //sabio:Events
const _loggerPage = _logger.extend("ViewAllMap"); //sabio:Events:ViewAllMap

function MyComponent(props) {
  const { event } = props;
  const markers = [];
  for (let index = 0; index < event.length; index++) {
    //marker for each event; pushing into array
    let data = {};
    const element = event[index];
    data.lat = element.latitude;
    data.lng = element.longitude;
    markers.push(data);
  }
  const markerBounds = new window.google.maps.LatLngBounds();
  const avgCoord = (markers) => {
    let lat = 0;
    let lng = 0;
    const centerAvg = {};

    for (let index = 0; index < markers.length; index++) {
      //average the lat and lng for each marker in array to find center
      const currentMarker = markers[index];
      markerBounds.extend({ lat: currentMarker.lat, lng: currentMarker.lng });
      lat = lat + currentMarker.lat;
      lng = lng + currentMarker.lng;
    }
    lat = lat / markers.length;
    lng = lng / markers.length;
    centerAvg.lat = lat;
    centerAvg.lng = lng;

    return centerAvg;
  };
  const centerAvg = avgCoord(markers);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: centerAvg.lat,
    lng: centerAvg.lng,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.fitBounds(markerBounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    false && _loggerPage(map);
    setMap(null);
  }, []);
  false && _loggerPage(map);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((data) => {
        //create marker on map for each in the array of total events
        _loggerPage(data);
        return (
          <Marker
            animation="DROP"
            position={{ lat: data.lat, lng: data.lng }}
            key={data.lat}
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
