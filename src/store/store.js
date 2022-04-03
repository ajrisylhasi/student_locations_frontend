import combineReducers from "react-combine-reducers";
import { authReducer, initialAuthState } from "./auth-reducer";
import { initialUsersState, usersReducer } from "./users-reducer";
import { initialMapsState, mapsReducer } from "./maps-reducer";
import { initialLayoutState, layoutReducer } from "./layout-reducer";
import { eventsReducer, initialEventsState } from "./events-reducer";
import {
  participationsReducer,
  initialParticipationsState,
} from "./participations-reducer";

const [reducer, store] = combineReducers({
  auth: [authReducer, initialAuthState],
  users: [usersReducer, initialUsersState],
  maps: [mapsReducer, initialMapsState],
  layout: [layoutReducer, initialLayoutState],
  events: [eventsReducer, initialEventsState],
  participations: [participationsReducer, initialParticipationsState],
});

export { store, reducer };
