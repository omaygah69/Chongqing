import {
  Text,
  View,
  TouchableOpacity,
  Button,
  StatusBar,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from "expo-camera";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | any>(null);
  const [photoUri, setPhotoUri] = useState<any>(null);
  const router = useRouter();

  if (!permission) {
    <View />;
  }

  if (!permission?.granted) {
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
      const photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);

      try {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          const asset: MediaLibrary.Asset = await MediaLibrary.createAssetAsync(
            photo.uri
          );

          router.push({
            pathname: "/ocrscreen",
            params: { imageUri: asset.uri },
          });
        }
      } catch (error) {
        console.log("Error Saving Photo", error);
      }
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
          <View className="flex-1 flex-row pb-20">
            <View className="flex-1 items-center justify-end">
              <TouchableOpacity
                className=""
                onPress={() => router.push("/mainpage")}
              >
                <Entypo name="back" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-end">
              <TouchableOpacity className="" onPress={takePhoto}>
                <Feather name="aperture" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>

            <View className="flex-1 items-center justify-end">
              <TouchableOpacity className="" onPress={toggleCameraFacing}>
                <MaterialIcons name="cameraswitch" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
      <StatusBar hidden />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});