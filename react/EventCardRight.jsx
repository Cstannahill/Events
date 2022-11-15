import React from "react";

function EventCardRight(props) {
  const { event } = props;

  const onEditClicked = () => {
    props.onEdit(event);
  };
  const onViewMore = () => {
    props.onView(event);
  };

  return (
    <div className="card divSideRight text-center py-4 my-3 flex-col justify-self-end">
      <div className="card-body sideRight">
        <h3 className="card-title sideRight">{event.name}</h3>
        <strong className="card-time">
          {`${new Date(event.dateStart).toLocaleTimeString()} -  ${new Date(
            event.dateEnd
          ).toLocaleTimeString()}`}
          <br></br>
          {new Date(event.dateStart).toLocaleDateString()}
        </strong>
        <p className="card-location sideRight">{event.summary}</p>
        <strong className="card-text sideRight">
          {event.address} {event.zipCode}
        </strong>
      </div>
      <div className="buttons d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-md mx-1 viewMore btn-secondary"
          onClick={onViewMore}
        >
          View More
        </button>
        <button
          type="button"
          className="btn btn-md mx-1 edit btn-primary"
          onClick={onEditClicked}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default EventCardRight;
