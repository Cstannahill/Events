import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import ViewAllMap from "./ViewAllMap";

function BigMapWrap(props) {
  return (
    <>
      <div className="card divSideLeftMap mt-2 px-4 py-4">
        <Wrapper apiKey={""}>
          <ViewAllMap
            event={props.event}
            key={`mapco${Math.random() * 1000}`}
          />
        </Wrapper>
      </div>
    </>
  );
}

export default BigMapWrap;
