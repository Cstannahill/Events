import React, { useState, useEffect, useCallback } from "react";
import EventCardLeft from "./EventCardLeft";
import EventCardRight from "./EventCardRight";
import BigMapWrap from "./BigMapWrap";
import eventsService from "../../services/eventsService";
import EventsModal from "../modal/EventsModal";
import Geocode from "react-geocode";
import toastr from "toastr";
import "./events.css";
import SearchBarDate from "../selectPage/SearchByDate";
import SelectPaginate from "../selectPage/SelectPaginate";
import debug from "sabio-debug";
const _logger = debug.extend("Events"); //sabio:Events

function Events() {
  //events + components for right side cards
  const [events, setEvents] = useState({
    eventsArr: [],
    eventsComponents: [],
  });
  //single event + component for left side cards
  const [currentEvent, setCurrentEvent] = useState({
    event: [],
    eventComponent: [],
  });
  //info for form on the modal
  const [modalState, setModalState] = useState({
    name: "",
    headline: "",
    description: "",
    summary: "",
    slug: "",
    statusId: "",
    id: "",
    dateStart: "",
    dateEnd: "",
    address: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    primaryImage: { id: 0, url: "", typeId: 6 },
  });
  const clearedForm = {
    name: "",
    headline: "",
    description: "",
    summary: "",
    slug: "",
    statusId: "",
    id: "",
    dateStart: "",
    dateEnd: "",
    address: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    primaryImage: { id: 0, url: "", typeId: 1 },
  };
  //toggle modal show or not show
  const [modalShow, setModalShow] = useState({
    show: false,
  });
  //map component and toggling lg map on left side
  const [mapState, setMapState] = useState({
    show: false,
    arrayToMap: [],
  });
  // dates for search by date
  const [searchDate, setSearchDate] = useState({
    startDate: "",
    endDate: "",
  });
  //pagination info
  const [eventPageInfo, setEventPageInfo] = useState({
    count: 6,
    pageSize: 4,
    pageIndex: 0,
    current: 1,
  });
  //array of total events for count and for lg map markers
  const [totalEvents, setTotalEvents] = useState({
    totalEvArr: [],
  });

  Geocode.setApiKey("");
  useEffect(() => {
    // leftSideCard initialization
    eventsService
      .getRecentEvent()
      .then(onGetRecentEvent)
      .catch(onGetEventsPagesError);
  }, []);
  false && _logger(totalEvents);
  const onGetRecentEvent = (response) => {
    //left side card
    _logger("Get Events Page Success: ", response);
    const singleEventAr = response;
    setCurrentEvent((prevState) => {
      const newEvent = { ...prevState };
      newEvent.event = singleEventAr;
      newEvent.eventComponent = singleEventAr.map(mapEventLeft);
      return newEvent;
    });
  };

  const getMarkersArray = () => {
    //for lg map markers
    eventsService
      .getEventsPage(0, eventPageInfo.count)
      .then(setMarkersArray)
      .catch(onGetEventsPagesError);
  };
  useEffect(() => {
    //for lg map markers
    getMarkersArray();
  }, []);

  const setMarkersArray = (response) => {
    //for lg map markers; gives array to pass to component for looping / also gets total count for pagination
    const eventsAr = response.pagedItems;
    setTotalEvents((prevState) => {
      const newTotalEvents = { ...prevState };
      newTotalEvents.totalEvArr = eventsAr;
      return newTotalEvents;
    });
    setEventPageInfo((prevState) => {
      const newPageInfo = { ...prevState };
      newPageInfo.count = response.totalCount;
      return newPageInfo;
    });
  };

  const updateEventForm = (values) => {
    _logger("SetEvent Firing in main page with values:", values);
    setModalState((prevState) => {
      let newState = { ...prevState, ...values };
      return newState;
    });
    _logger("done updating state", modalState);
  };

  const updateThenSubmitForm = (values) => {
    _logger("SetEvent Firing in main page with values:", values);
    setModalState((prevState) => {
      let newState = { ...prevState, ...values };
      onSubmitRequest(newState);
      return newState;
    });
  };

  const onSubmitRequest = (values) => {
    _logger("Submit Firing in main page with values:", values);
    Geocode.fromAddress(`${values.address}`).then(
      (response) => {
        const lat = response.results[0].geometry.location.lat;
        const lng = response.results[0].geometry.location.lng;

        setModalState((prevState) => {
          const formState = { ...prevState };
          formState.latitude = lat;
          formState.longitude = lng;

          formState.id
            ? eventsService
                .updateEvent(formState.id, formState)
                .then(onUpdateEventSuccess)
                .catch(onUpdateEventError)
            : eventsService
                .addEvent(formState)
                .then(onAddEventSuccess)
                .catch(onAddEventError);
          return formState;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onAddEventClicked = () => {
    //resets modal form state in case edit was clicked first
    setModalState((prevState) => {
      let formInfo = { ...prevState };
      formInfo = clearedForm;
      return formInfo;
    });
    setModalShow((prevState) => {
      const modalVisibility = { ...prevState };
      modalVisibility.show = !prevState.show;
      return modalVisibility;
    });
  };

  const onUpdateEventSuccess = () => {
    //updates card without making GET call
    let id = modalState.id;
    _logger("Success updating event, eventID: ", id);
    toastr.success("Event updated successfully.");
    setEvents((prevState) => {
      const eventsData = { ...prevState };
      eventsData.eventsArr = [...eventsData.eventsArr];
      const idxOf = eventsData.eventsArr.findIndex((event) => {
        let result = false;
        if (event.id === id) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 0) {
        eventsData.eventsArr.splice(idxOf, 1, modalState);
        eventsData.eventsComponents = eventsData.eventsArr.map(mapEventsRight);
      }
      return eventsData;
    });
  };

  const onAddEventSuccess = (response) => {
    //pushes newly added event into totalevents state array for lg map marker+render to the dom to verify to user they added event
    _logger("Event add Success :", response);
    toastr.success("Event added Succesfully");
    setTotalEvents((prevState) => {
      const newEventsAr = { ...prevState };
      newEventsAr.totalEvArr.push(modalState);
      return newEventsAr;
    });
    setEvents((prevState) => {
      const newEvents = { ...prevState };
      newEvents.eventsArr.splice(0, 1, modalState);
      newEvents.eventsComponents = newEvents.eventsArr.map(mapEventsRight);
      return newEvents;
    });
  };

  useEffect(() => {
    //initial call for GET for right side events, runs on initialization and page change
    eventsService
      .getEventsPage(eventPageInfo.pageIndex, eventPageInfo.pageSize)
      .then(onGetEventsPagesSuccess)
      .catch(onGetEventsPagesError);
  }, [eventPageInfo.current]);

  const onViewMoreClicked = useCallback((event) => {
    //replaces the event on the left side when view more button is clicked
    const replacingEvent = [event];
    setCurrentEvent((prevState) => {
      const eventAr = { ...prevState };
      eventAr.event = replacingEvent;
      eventAr.eventComponent = replacingEvent.map(mapEventLeft);
      return eventAr;
    });
  }, []);

  const onGetEventsPagesSuccess = (response) => {
    //sets both parts of state for right side cards on success of GET call
    const eventsAr = response.pagedItems;
    setEvents((prevState) => {
      const newEvents = { ...prevState };
      newEvents.eventsArr = eventsAr;
      newEvents.eventsComponents = eventsAr.map(mapEventsRight);
      return newEvents;
    });
  };
  const onGetEventsPagesError = (error) => {
    //error handler
    console.warn("Error getting evPages: ", error);
  };

  const onAddEventError = (error) => {
    //error handler
    console.warn("Error adding event :", error);
    toastr.error("Something went wrong, event not added.");
  };

  const onUpdateEventError = (error) => {
    //error handler
    console.warn("Error updating event: ", error);
    toastr.error("Something went wrong updating the event.");
  };

  const mapEventLeft = (event) => {
    //map event left Side
    return <EventCardLeft key={`Left${event.id}`} event={event} />;
  };

  const mapEventsRight = (event) => {
    //map events on right hand side
    false && _logger(event);
    return (
      <EventCardRight
        key={event.id}
        event={event}
        onEdit={onEditRequest}
        onView={onViewMoreClicked}
        modalInfo={modalState}
      />
    );
  };

  const onEditRequest = useCallback((event) => {
    //toggles the modal show as well as setting state for modal info on edit request
    setModalShow((prevState) => {
      const modalVisibility = { ...prevState };
      modalVisibility.show = !prevState.show;
      setModalState((prevState) => {
        let modalInfo = { ...prevState };
        modalInfo = event;
        modalInfo.primaryImage.url = event.primaryImage.url;
        modalInfo.primaryImage.typeId = event.primaryImage.typeId;
        modalInfo.primaryImage.id = event.primaryImage.id;
        return modalInfo;
      });
      return modalVisibility;
    });
  }, []);

  const onToggleModal = () => {
    //toggles modal show for closing/adding new event
    setModalShow((prevState) => {
      const modalVisibility = { ...prevState };
      modalVisibility.show = !prevState.show;
      return modalVisibility;
    });
  };

  const onViewAllClicked = () => {
    //toggles lg map in place of left side card
    setMapState((prevState) => {
      const toggleView = { ...prevState };
      toggleView.show = !prevState.show;
      return toggleView;
    });
  };

  const onSearchFieldChange = (e) => {
    //binds search fields to search
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setSearchDate((prevState) => {
      const searchDate = { ...prevState };
      searchDate[name] = value;
      return searchDate;
    });
  };

  const onSearchSubmit = () => {
    //makes GET call based on state that is bound to search fields
    if (searchDate.startDate && searchDate.endDate) {
      eventsService
        .getEventByDate(
          searchDate.startDate,
          searchDate.endDate,
          0,
          eventPageInfo.pageSize
        )
        .then(onGetEventByDateSuccess)
        .catch(onGetEventByDateError);
    } //else being empty search fields + submit resets to original set of matched cards
    else {
      eventsService
        .getEventsPage(eventPageInfo.pageIndex, eventPageInfo.pageSize)
        .then(onGetEventsPagesSuccess)
        .catch(onGetEventsPagesError);
      getMarkersArray();
    }
  };
  const onGetEventByDateSuccess = (response) => {
    //get call matching the search date parameters to right side
    const totalInRange = response.totalCount;
    const eventsSearched = response.pagedItems;
    //set events/map events matching dates searched input
    setEvents((prevState) => {
      const newEvents = { ...prevState };
      newEvents.eventsArr = eventsSearched;
      newEvents.eventsComponents = eventsSearched.map(mapEventsRight);
      return newEvents;
    });
    //set count for pagination for events matching dates searched
    setEventPageInfo((prevState) => {
      const newPageInfo = { ...prevState };
      newPageInfo.count = totalInRange;
      return newPageInfo;
    });
  };
  const onGetEventByDateError = (error) => {
    //error handler
    toastr.error("Something went wrong during the search.");
    console.warn("Error Search by Date: ", error);
  };
  const onPageChange = (page) => {
    //changes current page and page index state when page is changed
    setEventPageInfo((prevState) => {
      const newPage = { ...prevState };
      newPage.current = page;
      newPage.pageIndex = newPage.current - 1;
      return newPage;
    });
  };

  return (
    <React.Fragment>
      <main role="main">
        <div className="eventContainer text-dark">
          <div className="mb-4 my-2 eventHeader rounded-3">
            <div className="container-fluid py-2">
              <h1 className="display-5 fw-bold text-center">Events</h1>
            </div>
            <div className="d-flex justify-content-end">
              <SearchBarDate
                onSearchEntry={onSearchFieldChange}
                onSubmitSearch={onSearchSubmit}
              />
              <button
                type="button"
                className="btn btn-warning  mx-2 my-2"
                onClick={onViewAllClicked}
              >
                {!mapState.show && "View All on Map"}
                {mapState.show && "Hide Map"}
              </button>
              <button
                type="button"
                className="btn btn-success  mx-2 my-2"
                onClick={onAddEventClicked}
              >
                + Add Event
              </button>
            </div>
          </div>

          <div className="d-flex col-lg-12 col-md-12 col-sm-8">
            {!mapState.show && currentEvent.eventComponent}
            {mapState.show && (
              <BigMapWrap
                event={totalEvents.totalEvArr}
                key={`mapwrapperco${Math.random() * 1000}`}
              />
            )}
            <div className="rightContainer justify-self-end justify-content-end">
              <div>
                <SelectPaginate
                  evPgInfo={eventPageInfo}
                  onPageChange={onPageChange}
                />
              </div>
              {events.eventsComponents}
            </div>
          </div>
          <hr />
        </div>
        <EventsModal
          onOpen={modalShow}
          formInfo={modalState}
          onToggle={onToggleModal}
          onSubmit={updateThenSubmitForm}
          setForm={updateEventForm}
        />
      </main>
    </React.Fragment>
  );
}

export default Events;
