const initialMapsState = {
  selectedPlace: {
    name: "Debrecen",
    category: "City",
    average_rating: 4.7,
    description:
      "Debrecen is the capital of Hungary’s Northern Great Plain region. Its 2-towered, 19th-century Reformed Church sits on the expansive main square, Kossuth Tér. Nearby, the Museum of the Reformed College of Debrecen has exhibits on the history of the city and the college. The Déri Museum’s eclectic collection includes archaeological finds, centuries-old weapons, fine art, local craft displays and a chamber of wonders.",
  },
  selectedDrawer: false,
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
