import axios from "axios";

const eventsEndpoint = "";

const getEventsPage = (index, size) => {
  const config = {
    method: "GET",
    url: `${eventsEndpoint}/paginate/?pageIndex=${index}&&pageSize=${size}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const getRecentEvent = () => {
  const config = {
    method: "GET",
    url: `${eventsEndpoint}/paginate/?pageIndex=0&&pageSize=1`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item.pagedItems);
};

const getEventBySlug = (slug) => {
  const config = {
    method: "GET",
    url: `${eventsEndpoint}}/${slug}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data.item);
};

const getEventById = (id) => {
  const config = {
    method: "GET",
    url: `${eventsEndpoint}/${id}`,
    crossdomain: true,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => response.data);
};

const addEvent = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: `${eventsEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return {
      ...payload,
      id: response.data.item,
    };
  });
};

const updateEvent = (id, payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${eventsEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return {
      ...payload,
      id: id,
    };
  });
};

const getEventByDate = (startDate, endDate, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${eventsEndpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    return response.data.item;
  });
};

const eventsSeverice = {
  getEventsPage,
  getRecentEvent,
  getEventBySlug,
  getEventById,
  addEvent,
  updateEvent,
  getEventByDate,
};
export default eventsSeverice;
