const initialEventsState = {
  allEvents: [],
  selectedEvent: {
    name: "",
  },
  eventPlace: {
    name: "",
    lng: 0,
    lat: 0,
  },
  newEventForm: false,
  selectedDrawer: false,
};

const eventsActions = {
  EVENTS_SET_ALL: "EVENTS_SET_ALL",
  CLEAR_EVENTS: "CLEAR_EVENTS",
};

function eventsReducer(state, action) {
  switch (action.type) {
    case eventsActions.EVENTS_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case eventsActions.CLEAR_EVENTS:
      return {
        ...initialEventsState,
      };
    default:
      return state;
  }
}

export { initialEventsState, eventsActions, eventsReducer };
