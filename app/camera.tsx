import { Feather } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | any>(null);
  const [pic, setPic] = useState<any>(null);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
        shutterSound: true,
      };
      const newPic = await cameraRef.current.takePictureAsync(options);
      setPic(newPic);
    }
  };
  return (
    // <View style={styles.container}>
    //   <CameraView style={styles.camera} facing={facing}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
    //         <Text style={styles.text}>Flip Camera</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </CameraView>
    // </View>
    <>
      <View className="flex-1 justify-center">
        <CameraView
          style={styles.camera}
          autofocus="on"
          facing={facing}
          ref={cameraRef}
        >
          <View className="flex-1 items-center justify-end">
            <TouchableOpacity className="mb-32" onPress={takePhoto}>
              <Feather name="aperture" color="#ffffff" size={64} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
      <StatusBar hidden />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Camera;
