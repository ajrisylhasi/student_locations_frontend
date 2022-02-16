import React, { createContext, useMemo } from "react";
import PropTypes from "prop-types";

import { store, reducer } from "../../store/store";

/* provides global state and dispatch to all children */

const storeContext = createContext({});

export { storeContext };

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, store);
  const providerMemo = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <storeContext.Provider value={providerMemo}>
      {children}
    </storeContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
