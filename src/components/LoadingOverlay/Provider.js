import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import LoadingOverlay from "./index";

export default class LoadingOverlayProvider extends Component {
  static childContextTypes = {
    showLoadingOverlay: PropTypes.func,
    hideLoadingOverlay: PropTypes.func
  };

  getChildContext() {
    return {
      showLoadingOverlay: () => this._overlayRef && this._overlayRef.showLoadingOverlay(),
      hideLoadingOverlay: () => this._overlayRef && this._overlayRef.hideLoadingOverlay()
    };
  }

  render() {
    return (
      <Fragment>
        {React.Children.only(this.props.children)}
        <LoadingOverlay ref={component => (this._overlayRef = component)} />
      </Fragment>
    );
  }
}
