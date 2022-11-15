import React from "react";
import GoogleMaps from "./GoogleMaps";

function EventCardLeft(props) {
  const { event } = props;

  return (
    <div className="card divSideLeft px-4 pb-4">
      <h5 className="card-header sideLeft text-center">{event.name}</h5>
      <img
        className="card-img-top sideLeft"
        src={event.primaryImage.url}
        alt="event"
      />
      <div className="card-body sideLeft text-center">
        <h5 className="card-title sideLeft my-2">{event.name}</h5>
        <p className="card-headline sideLeft my-2 text-center">
          {event.summary}
        </p>
        <p className="card-text sideLeft my-2">{event.description}</p>
        <div id="map"></div>
        <div className="event-info sideLeft">
          <strong className="location sideLeft">
            {event.address} {event.zipCode}
          </strong>
          <br></br>
          <strong className="time sideLeft">
            {new Date(event.dateStart).toLocaleTimeString()}
            <br></br>
            {new Date(event.dateStart).toLocaleDateString()}
          </strong>
        </div>
      </div>
      <GoogleMaps event={props} key={`map${event.id}`} />
    </div>
  );
}

export default EventCardLeft;
