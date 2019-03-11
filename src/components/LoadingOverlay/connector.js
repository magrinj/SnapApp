import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

export default function connectLoadingOverlay(WrappedComponent) {
  const ConnectedLoadingOverlay = (props, context) => {
    return (
      <WrappedComponent
        {...props}
        showLoadingOverlay={context.showLoadingOverlay}
        hideLoadingOverlay={context.hideLoadingOverlay}
      />
    );
  };

  ConnectedLoadingOverlay.contextTypes = {
    showLoadingOverlay: PropTypes.func,
    hideLoadingOverlay: PropTypes.func
  };

  return hoistStatics(ConnectedLoadingOverlay, WrappedComponent);
}
