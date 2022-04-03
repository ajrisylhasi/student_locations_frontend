const initialParticipationsState = {
  allParticipations: [],
  selectedDrawer: false,
};

const participationsActions = {
  PARTICIPATIONS_SET_ALL: "PARTICIPATIONS_SET_ALL",
  CLEAR_PARTICIPATIONS: "CLEAR_PARTICIPATIONS",
};

function participationsReducer(state, action) {
  switch (action.type) {
    case participationsActions.PARTICIPATIONS_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case participationsActions.CLEAR_PARTICIPATIONS:
      return {
        ...initialParticipationsState,
      };
    default:
      return state;
  }
}

export {
  initialParticipationsState,
  participationsActions,
  participationsReducer,
};
