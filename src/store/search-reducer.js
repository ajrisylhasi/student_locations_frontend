const initialSearchState = {};

const searchActions = {
  SEARCH_SET_ALL: "SEARCH_SET_ALL",
  CLEAR_SEARCH: "CLEAR_SEARCH",
};

function searchReducer(state, action) {
  switch (action.type) {
    case searchActions.SEARCH_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case searchActions.CLEAR_SEARCH:
      return {
        ...initialSearchState,
      };
    default:
      return state;
  }
}

export { initialSearchState, searchActions, searchReducer };
