import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";

import LoadingOverlayProvider from "./src/components/LoadingOverlay/Provider";

import CameraScreen from "./src/screens/CameraScreen";
import PreviewScreen from "./src/screens/PreviewScreen";

import configureStore from "./src/core/configureStore";

const store = configureStore();

const AppNavigator = createStackNavigator(
  {
    Camera: CameraScreen,
    Preview: PreviewScreen
  },
  {
    initialRouteName: "Camera",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoadingOverlayProvider>
          <AppContainer />
        </LoadingOverlayProvider>
      </Provider>
    );
  }
}
