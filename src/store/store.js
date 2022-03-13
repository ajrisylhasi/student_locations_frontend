import combineReducers from "react-combine-reducers";
import { authReducer, initialAuthState } from "./auth-reducer";
import { initialSearchState, searchReducer } from "./search-reducer";
import { initialMapsState, mapsReducer } from "./maps-reducer";

const [reducer, store] = combineReducers({
  auth: [authReducer, initialAuthState],
  search: [searchReducer, initialSearchState],
  maps: [mapsReducer, initialMapsState],
});

export { store, reducer };
