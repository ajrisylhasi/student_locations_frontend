import * as React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const { REACT_APP_MAPS_API_KEY } = process.env;

const CustomMap = ({ lat, lng, zoom, children }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: `${REACT_APP_MAPS_API_KEY}`,
    }}
    options={{ keyboardShortcuts: false, zoomControl: false }}
    defaultCenter={{ lat, lng }}
    defaultZoom={zoom}
  >
    {children}
  </GoogleMapReact>
);

CustomMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomMap;
