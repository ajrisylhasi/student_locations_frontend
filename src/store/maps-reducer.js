const initialMapsState = {
  selectedPlace: {},
  allPlaces: [],
};

const mapsActions = {
  MAPS_SET_ALL: "MAPS_SET_ALL",
  CLEAR_MAPS: "CLEAR_MAPS",
};

function mapsReducer(state, action) {
  switch (action.type) {
    case mapsActions.MAPS_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case mapsActions.CLEAR_MAPS:
      return {
        ...initialMapsState,
      };
    default:
      return state;
  }
}

export { initialMapsState, mapsActions, mapsReducer };
