import { useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyBcAmSgDdezOK2VjtyVIgHaClKryVfAySc",
});

const compressImage = async (uri: string): Promise<string | null> => {
    try {
	const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
	    uri,
	    [{ resize: { width: 800, height: 600 } }],
	    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
	);
	return resizedUri;
    } catch (error) {
	console.error("Error compressing image:", error);
	return null;
    }
};

const convertToBase64 = async (uri: string): Promise<string | null> => {
    try {
	return await FileSystem.readAsStringAsync(uri, {
	    encoding: FileSystem.EncodingType.Base64,
	});
    } catch (error) {
	console.error("Error converting to base64:", error);
	return null;
    }
};

const performOCR = async (base64Image: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append("apikey", "K86324583088957");
    formData.append("base64Image", `data:image/jpeg;base64,${base64Image}`);
    formData.append("OCREngine", "2");

    try {
	const response = await fetch("https://api.ocr.space/parse/image", {
	    method: "POST",
	    body: formData,
	});

	const json = await response.json();
	return json?.ParsedResults?.[0]?.ParsedText ?? null;
    } catch (error) {
	console.error("OCR request failed:", error);
	return null;
    }
};

const generateAIResponse = async (text: string): Promise<string | null> => {
    try {
	const response = await ai.models.generateContent({
	    model: "gemini-2.0-flash",
	    contents: text,
	});
	return response.text;
    } catch (error) {
	console.error("AI generation failed:", error);
	return null;
    }
};

export default function OCRScreen() {
    const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
    const [recognizedText, setRecognizedText] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
	const processImage = async () => {
	    if (!imageUri) {
		setError("No image provided");
		setLoading(false);
		return;
	    }

	    const compressedUri = await compressImage(imageUri);
	    if (!compressedUri) {
		setError("Image compression failed");
		setLoading(false);
		return;
	    }

	    const base64 = await convertToBase64(compressedUri);
	    if (!base64) {
		setError("Failed to convert image to Base64");
		setLoading(false);
		return;
	    }

	    const text = await performOCR(base64);
	    if (!text) {
		setError("OCR failed to recognize text");
		setLoading(false);
		return;
	    }

	    setRecognizedText(text);

	    const aiResult = await generateAIResponse(text);
	    if (aiResult) {
		setAiResponse(aiResult);
	    }

	    setLoading(false);
	};

	processImage();
    }, [imageUri]);

    return (
	<SafeAreaView style={styles.screen}>
	    <ScrollView contentContainerStyle={styles.content}>
		<View style={styles.imageContainer}>
		    {imageUri ? (
			<Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
		    ) : (
			<Text style={styles.errorText}>No image provided</Text>
		    )}
		</View>

		<View style={styles.textWrapper}>
		    {loading ? (
			<ActivityIndicator size="large" color="#0000ff" />
		    ) : error ? (
			<Text style={styles.errorText}>{error}</Text>
		    ) : recognizedText ? (
			<>
			    <Text style={styles.text}>{recognizedText}</Text>
			    {aiResponse && (
				<Text style={[styles.text, { marginTop: 10, color: '#ccc' }]}>
				    {aiResponse}
				</Text>
			    )}
			</>
		    ) : (
			<Text style={styles.text}>No text found</Text>
		    )}
		</View>
	    </ScrollView>
	    <StatusBar style="dark" backgroundColor="#011121" />
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#011121" },
    content: { padding: 20, alignItems: "center" },
    imageContainer: { marginBottom: 20 },
    image: { width: 300, height: 300 },
    textWrapper: { width: "100%", alignItems: "center", paddingHorizontal: 10 },
    text: { fontSize: 16, color: "#ccc", textAlign: "center" },
    errorText: { fontSize: 18, color: "red", textAlign: "center" },
});
