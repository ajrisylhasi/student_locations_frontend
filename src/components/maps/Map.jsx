import * as React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const { REACT_APP_MAPS_API_KEY } = process.env;

const Map = ({ lat, lng, zoom, children, ...props }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: `${REACT_APP_MAPS_API_KEY}`,
    }}
    options={(map) => ({
      keyboardShortcuts: false,
      zoomControl: false,
      fullscreenControl: false,
      mapTypeControl: true,
      mapTypeId: map.MapTypeId.HYBRID,
    })}
    defaultZoom={zoom}
    center={{ lat, lng }}
    {...props}
  >
    {children}
  </GoogleMapReact>
);

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Map.defaultProps = {
  children: null,
};
export default Map;
