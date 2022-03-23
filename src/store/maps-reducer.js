const initialMapsState = {
  selectedPlace: {
    name: "Debrecen",
    category: "City",
    lng: 21.6286541,
    lat: 47.5399565,
    description:
      "Debrecen is the capital of Hungary’s Northern Great Plain region. Its 2-towered, 19th-century Reformed Church sits on the expansive main square, Kossuth Tér. Nearby, the Museum of the Reformed College of Debrecen has exhibits on the history of the city and the college. The Déri Museum’s eclectic collection includes archaeological finds, centuries-old weapons, fine art, local craft displays and a chamber of wonders.",
  },
  selectedDrawer: false,
  newPlaceForm: false,
  allPlaces: [],
  userPlaces: [],
};

const mapsActions = {
  MAPS_SET_ALL: "MAPS_SET_ALL",
  CLEAR_MAPS: "CLEAR_MAPS",
  MAPS_INITIAL_SELECTED_PLACE: "MAPS_INITIAL_SELECTED_PLACE",
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
    case mapsActions.MAPS_INITIAL_SELECTED_PLACE:
      return {
        ...state,
        selectedPlace: {
          name: "Debrecen",
          category: "City",
          lng: 21.6286541,
          lat: 47.5399565,
          description:
            "Debrecen is the capital of Hungary’s Northern Great Plain region. Its 2-towered, 19th-century Reformed Church sits on the expansive main square, Kossuth Tér. Nearby, the Museum of the Reformed College of Debrecen has exhibits on the history of the city and the college. The Déri Museum’s eclectic collection includes archaeological finds, centuries-old weapons, fine art, local craft displays and a chamber of wonders.",
        },
      };
    default:
      return state;
  }
}

export { initialMapsState, mapsActions, mapsReducer };
