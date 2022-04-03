const initialUsersState = {
  allUsers: [],
  selectedUser: {
    fullname: "",
    username: "",
    email: "",
    faculty: "",
    course: "",
    nationality: "",
  },
  selectedDrawer: false,
};

const usersActions = {
  USERS_SET_ALL: "USERS_SET_ALL",
  CLEAR_USERS: "CLEAR_USERS",
};

function usersReducer(state, action) {
  switch (action.type) {
    case usersActions.USERS_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case usersActions.CLEAR_USERS:
      return {
        ...initialUsersState,
      };
    default:
      return state;
  }
}

export { initialUsersState, usersActions, usersReducer };
