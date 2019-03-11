// @flow
import React, { PureComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default class LoadingOverlay extends PureComponent {

  state = {
    visible: false
  };

  showLoadingOverlay = () => {
    const { visible } = this.state;

    if (visible) {
      return;
    }
    this.setState({
      visible: true
    });
  }

  hideLoadingOverlay = () => {
    const { visible } = this.state;

    if (!visible) {
      return;
    }
    this.setState({
      visible: false
    });
  }

  render() {
    const { visible } = this.state;

    if (!visible) {
      return false;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"white"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, bottom: 0,
    left: 0, right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});
