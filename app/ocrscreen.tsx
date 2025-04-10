import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import { Context, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

const compressImage = async (uri: string) => {
  console.log("Compressing image:", uri);
  try {
    const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800, height: 600 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    console.log("Resized image URI:", resizedUri);
    return resizedUri;
  } catch (err) {
    console.error("Error resizing image:", err);
  }
};

const convertImageToBase64 = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return null;
  }
};

export default function OCRScreen() {
  const { imageUri }: { imageUri: any } = useLocalSearchParams();
  const [recognizedText, setRecognizedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUri) {
      setErrorMessage("No image provided");
      setLoading(false);
      return;
    }

    async function OCR(uri: string) {
      const compressedImageUri = await compressImage(uri);
      if (!compressedImageUri) {
        throw new Error("Compressed image URI is undefined");
      }
      const base64ImageUri = await convertImageToBase64(compressedImageUri);
      const url = "https://api.ocr.space/parse/image";
      let data = new FormData();

      if (base64ImageUri) {
        data.set("base64Image", `data:image/jpeg;base64,${base64ImageUri}`);
      } else {
        throw new Error("Failed to convert image to Base64");
      }

      data.set("apikey", "K86324583088957");

      try {
        console.log("first");
        const response = await fetch(url, { method: "POST", body: data });
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error(error);
        return { error: true };
      }
    }
    OCR(imageUri);

    // const processImage = async () => {
    //   // Compress the image
    //   const compressedImageUri = await compressImage(imageUri);

    //   if (!compressedImageUri) {
    //     setErrorMessage("Failed to compress image");
    //     setLoading(false);
    //     return;
    //   }

    //   console.log(imageUri);
    //   const formData = new FormData();

    //   const localUri = compressedImageUri;
    //   const filename = localUri.split("/").pop();
    //   const type = "jpg";

    //   formData.append("apikey", "K86324583088957");
    //   const file = {
    //     uri: localUri,
    //     name: filename,
    //     type: type,
    //   } as any;
    //   console.log(formData);

    //   formData.append("file", file);

    //   try {
    //     const response = await fetch("https://api.ocr.space/parse/image", {
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // setLoading(false);
    // processImage();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </>
      ) : (
        <Text style={styles.errorText}>No image provided</Text>
      )}
      {false ? (
        <ActivityIndicator size="large" color="blue" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.text}>{recognizedText}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  image: { width: 300, height: 300, marginBottom: 20 },
  text: { fontSize: 16, textAlign: "center" },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
});
