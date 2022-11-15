import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import MyMapComponent from "./MyMapComponent";

function GoogleMaps(props) {
  const event = props;
  return (
    <Wrapper apiKey={""} className="small-map">
      <MyMapComponent event={event} key={`mapco${Math.random() * 1000}`} />
    </Wrapper>
  );
}

export default GoogleMaps;
