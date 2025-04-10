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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDf6BiH0sOxi20haEoHkHESW9Rpt9Ol46g",
});

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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [airesponse, setairesponse] = useState<string>();

  useEffect(() => {
    if (!imageUri) {
      setErrorMessage("No image provided");
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
      data.set("OCREngine", "2");

      try {
        console.log("first");
        const response = await fetch(url, { method: "POST", body: data });
        const json = await response.json();
        setRecognizedText(json.ParsedResults[0].ParsedText);
        console.log(json.ParsedResults[0].ParsedText);
        setLoading(false);

        async function g() {
          const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${json.ParsedResults[0].ParsedText}`,
          });
          setairesponse(response.text);
          console.log(response.text);
        }

        await g();
      } catch (error) {
        setLoading(false);
        setErrorMessage("Failed to recognize text");
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
  }, [imageUri]);

  return (
    <SafeAreaView className="flex-1 bg-backgroundColor">
      <ScrollView className="h-full">
        <View style={styles.container} className="text-white">
          {imageUri ? (
            <>
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
              />
            </>
          ) : (
            <Text style={styles.errorText}>No image provided</Text>
          )}
        </View>
        <View className="px-5">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : recognizedText ? (
            <Text style={styles.text} className="text-slate-300">
              {recognizedText}
            </Text>
          ) : (
            <Text style={styles.text}>No text found</Text>
          )}
          <Text className="text-slate-300">{airesponse ? airesponse : ""}</Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#011121" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  image: { width: 300, height: 300, marginBottom: 20 },
  text: { fontSize: 16, textAlign: "center" },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
});
