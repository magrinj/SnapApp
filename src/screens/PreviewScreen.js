import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  CameraRoll,
  Text,
  Alert,
	View
} from "react-native";
import { Permissions } from "@unimodules/core";
import Video, { FilterType } from "react-native-video";

import connectLoadingOverlay from "../components/LoadingOverlay/connector";

const FILTERS = [
  FilterType.NONE,
  FilterType.SEPIA,
  FilterType.INVERT,
  FilterType.MONO,
  FilterType.CHROME,
  FilterType.TONAL
];

class PreviewScreen extends Component {

  state = {
    filterIdx: 3,
    filterLabelVisible: true
  };

  _nextFilter = () => {
    const { filterIdx } = this.state;

    this.setState({
      filterIdx: ((FILTERS.length - 1) - filterIdx  > 0) ? (filterIdx + 1) : 0,
      filterLabelVisible: false
    });
  }

  _saveVideo = async () => {
    if (this.player) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status == 'granted') {
        this.props.showLoadingOverlay();
        this.player.save().then((res) => {
          CameraRoll.saveToCameraRoll(res.uri, "video");
          Alert.alert("Saved into your camera roll");
        }).finally(() => {
          this.props.hideLoadingOverlay();
        });
      }
    }
  }

	render() {
    const {
      filterIdx,
      filterLabelVisible
    } = this.state;
    const video = this.props.navigation.getParam('video', null);

		if (!video) {
			return (<View />);
		} else {
			return (
        <View style={styles.container}>
          <Video
						ref={(ref) => {
							this.player = ref;
						}}
            style={styles.absolute}
            source={{ uri: video }}
            onEnd={this._onEnd}
            shouldPlay
            filter={FILTERS[filterIdx]}
            filterEnabled
            repeat
          />
          <TouchableWithoutFeedback
            onPress={this._nextFilter}
          >
            <View style={[styles.absolute, styles.content]}>
              <View style={styles.header}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => this.props.navigation.goBack()}
                  >
                  <Text style={styles.text}>
                    {"Close"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this._saveVideo}
                  >
                  <Text style={styles.text}>
                    {"Save"}
                  </Text>
                </TouchableOpacity>
              </View>
              {
                filterLabelVisible ?
                  <View style={styles.center}>
                    <Text style={styles.text}>
                      {"Tap to change filter"}
                    </Text>
                  </View>
                : false
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
			)
		}
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  absolute: {
    position: "absolute",
    top: 0, bottom: 0,
    left: 0, right: 0
  },
  content: {
    flexDirection: "column"
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 15,
    justifyContent: "space-between"
  },
  button: {
    marginTop: 35,
    height: 30
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
		fontSize: 18,
		marginBottom: 10,
		color: "white"
	},
});

export default connectLoadingOverlay(PreviewScreen);
