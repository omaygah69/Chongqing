import { Feather } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
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
  const cameraRef = useRef<any>(null);
  const [photoUri, setPhotoUri] = useState<any>(null);
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
  const save = async () => {
    const appDirectory = FileSystem.documentDirectory + "photos/";
    await FileSystem.makeDirectoryAsync(appDirectory, { intermediates: true });
    const photoFileName = photoUri.split("/").pop();
    const newFilePath = appDirectory + photoFileName;

    // Copy the photo to the new location in the app's directory
    await FileSystem.copyAsync({
      from: photoUri,
      to: newFilePath,
    });
  };
  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
        shutterSound: true,
      };
      const photo = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(photo);
      try {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(photo.uri);
          console.log("Photo saved to gallery");
        }
      } catch (error) {
        console.error("Error saving photo:", error);
      }
      save();
    }
  };

  return (
    <>
      <View className="flex-1 justify-center">
        <CameraView
          style={styles.camera}
          autofocus="on"
          facing={facing}
          ref={cameraRef}
        >
          <View className="flex-1 items-center justify-end mb-32">
            <TouchableOpacity className="" onPress={takePhoto}>
              <Feather name="aperture" color="#ffffff" size={64} />
            </TouchableOpacity>
            <Text className="text-white">Capture</Text>
          </View>
        </CameraView>
      </View>
      {photoUri && (
        <View style={{ marginTop: 20 }}>
          <Image source={photoUri} style={{ width: 200, height: 200 }} />
        </View>
      )}
      <StatusBar hidden />
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default Camera;
