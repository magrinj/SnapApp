import React, { Component } from "react";
import {
	StyleSheet,
  SafeAreaView,
  Alert,
	View,
	Text,
	TouchableOpacity
} from "react-native";
import { compose } from "redux";
import { connect } from "react-redux";
import { Permissions } from "@unimodules/core";
import { Camera } from "expo-camera";
import RNVideoEditor from "react-native-video-editor";

import connectLoadingOverlay from "../components/LoadingOverlay/connector";

import {
	addVideoToSnap
} from "../core/actions/video";

class CameraScreen extends Component {

	state = {
		permissionsGranted: null,
		type: Camera.Constants.Type.front,
		isRecording: false
	};

	async componentDidMount() {
		const cameraResponse = await Permissions.askAsync(Permissions.CAMERA);
		if (cameraResponse.status == 'granted') {
			const audioResponse = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
			this.setState({
				permissionsGranted: audioResponse.status === "granted"
			});
		}
	}

	_recordVideo = () => {
		const { isRecording } = this.state;

		if (this.camera) {
			if (isRecording) {
				this.camera.stopRecording();
			} else {
				this.camera.recordAsync().then((data) => {
					if (data.uri) {
						this.props.addVideoToSnap(data.uri);
					}
				})
			}
			this.setState({
				isRecording: !isRecording
			});
		}
  }
  
  _moveToPreview = () => {
    const { snap } = this.props;

    if (snap && snap.length > 0) {
      this.props.showLoadingOverlay();
      RNVideoEditor.merge(
        snap,
        (err) => {
          Alert.alert(err);
          this.props.hideLoadingOverlay();
        },
        (res, file) => {
          this.props.hideLoadingOverlay();
          this.props.navigation.navigate('Preview', {
            video: file
          });
        }
      )
    }
  }

  _getRecordLabel() {
    const {
      isRecording,
    } = this.state;
    const {
      snap
    } = this.props;

    if (isRecording) {
      return "Pause record";
    }
    return snap && snap.length > 0 ? "Continue" : "Record";
  }

	render() {
		const {
			permissionsGranted,
      type,
      isRecording
		} = this.state;
		const {
			snap
		} = this.props;

		if (permissionsGranted === null) {
			return (<View />);
		} else if (permissionsGranted === false) {
			return (<Text>No access to camera !</Text>);
		} else {
			return (
				<View style={{flex: 1}}>
					<Camera
						ref={(cam) => {
							this.camera = cam;
						}}
						style={styles.camera}
						type={type}
					>
						<SafeAreaView style={styles.container}>
							<View style={styles.footerBar}>
								<TouchableOpacity
									style={styles.button}
									onPress={this._recordVideo}
								>
									<Text style={[
										styles.text,
										isRecording ? styles.textRed : null
									]}>
										{this._getRecordLabel()}
									</Text>
								</TouchableOpacity>
                {
                  snap && snap.length > 0 ?
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this._moveToPreview}
                    >
                      <Text style={styles.text}>
                        {"Next"}
                      </Text>
                    </TouchableOpacity>
                  : false
                }
							</View>
						</SafeAreaView>
					</Camera>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	camera: {
		flex: 1
	},
	container: {
		flex: 1,
		justifyContent: "flex-end"
	},
	footerBar: {
    flexDirection: "row",
		height: 50,
		marginHorizontal: 25,
		justifyContent: "space-between"
	},
	button: {
	},
	text: {
		fontSize: 18,
		marginBottom: 10,
		color: "white"
	},
	textRed: {
		color: "red"
	}
});

const mapStateToProps = (
  { video }
) => ({
	snap: video.snap
});

const mapDispatchToProps = {
	addVideoToSnap
};

export default compose(
  connect(
	  mapStateToProps,
	  mapDispatchToProps
  ),
  connectLoadingOverlay
)(CameraScreen);
