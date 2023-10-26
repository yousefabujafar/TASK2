import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ViewPropTypes from 'deprecated-react-native-prop-types'

export default class App extends React.Component {
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      let filePath = RNFS.ExternalDirectoryPath + '/photo.jpg';
      RNFS.writeFile(filePath, data.base64, 'base64')
        .then(() => console.log('Image saved to', filePath))
        .catch(err => console.log(err.message));
    
      }
  };

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      >
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ flex: 0, backgroundColor: '#fff', borderRadius: 5, padding: 15, paddingHorizontal: 20, alignSelf: 'center', margin: 20 }}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </RNCamera>
    );
  }
}
