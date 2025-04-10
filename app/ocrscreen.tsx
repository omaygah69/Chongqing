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
    const processImage = async () => {
      // Compress the image
      const compressedImageUri = await compressImage(imageUri);

      if (!compressedImageUri) {
        setErrorMessage("Failed to compress image");
        setLoading(false);
        return;
      }

      console.log(imageUri);
      const formData = new FormData();

      const localUri = compressedImageUri;
      const filename = localUri.split("/").pop();
      const type = "image/jpeg";

      formData.append("apikey", "K86324583088957");
      const file = {
        uri: localUri,
        name: filename,
        type: type,
      } as any;

      formData.append("file", file);

      try {
        const response = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    // const processImage = async () => {
    //   const worker = await Tesseract.createWorker("eng");
    //   const {
    //     data: { text },
    //   } = await worker.recognize(imageUri);
    //   setRecognizedText(text);
    //   console.log(recognizedText);
    //   await worker.terminate();
    // };

    // try {
    //   console.log("Processing image:", imageUri); // Debug log

    //   Tesseract.recognize(imageUri, "eng", {
    //     logger: (m) => console.log(m),
    //   }).then(({ data: { text } }) => {
    //     console.log("OCR Result:", text);
    //     setRecognizedText(text || "No text recognized");
    //   });
    // } catch (error) {
    //   console.error("OCR Error:", error);
    //   setErrorMessage("Failed To Recognize Text.");
    // }
    setLoading(false);
    processImage();
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
