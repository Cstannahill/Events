import Loki from "react-loki";
import "./loki.css";
import EventsInfoForm from "./LokiEvents/EventsInfoForm";
import EventTimePlace from "./LokiEvents/EventTimePlace";
import EventsImage from "./LokiEvents/EventsImage";
import React from "react";
import {
  faUser,
  faMapLocationDot,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Autocomplete } from "@react-google-maps/api";
// import AddressAutoComplete from "../google/AddressAutoComplete";

function LokiEvents(props) {
  false && console.log(props);
  const { event } = props;
  const { setEvent } = props;
  const { submitEvent } = props;
  false && console.log(setEvent, Autocomplete);

  const complexSteps = [
    {
      label: "Step 1",
      icon: <FontAwesomeIcon icon={faUser} className="mt-3 lokiCenter" />,
      component: <EventsInfoForm event={event} />,
    },
    {
      label: "Step 2",
      icon: (
        <FontAwesomeIcon icon={faMapLocationDot} className="mt-3 lokiCenter" />
      ),
      component: <EventTimePlace event={event} setEvent={setEvent} />,
    },
    {
      label: "Step 3",
      icon: <FontAwesomeIcon icon={faImage} className="mt-3 lokiCenter" />,
      component: <EventsImage event={event} />,
    },
  ];

  const _finishWizard = (values) => {
    console.log("Firing in LokiEvents with values:", values);
    submitEvent(values);
  };

  return (
    <>
      <div className="Demo">
        <Loki
          steps={complexSteps}
          onNext={setEvent}
          onBack={setEvent}
          onFinish={_finishWizard}
          noActions
        />
      </div>
    </>
  );
}

export default LokiEvents;
