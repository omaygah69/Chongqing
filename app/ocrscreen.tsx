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
    apiKey: "YOUR_GOOGLE_API_KEY", // replace this with an env variable for security in production
});

const compressImage = async (uri: string) => {
    try {
	const { uri: resizedUri } = await ImageManipulator.manipulateAsync(
	    uri,
	    [{ resize: { width: 800 } }],
	    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
	);
	return resizedUri;
    } catch (err) {
	console.error("Error resizing image:", err);
    }
};

const convertImageToBase64 = async (uri: string) => {
    try {
	return await FileSystem.readAsStringAsync(uri, {
	    encoding: FileSystem.EncodingType.Base64,
	});
    } catch (error) {
	console.error("Error converting image to Base64:", error);
	return null;
    }
};

export default function OCRScreen() {
    const { imageUri } = useLocalSearchParams();
    const [recognizedText, setRecognizedText] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
	if (!imageUri) {
	    setErrorMessage("No image provided.");
	    setLoading(false);
	    return;
	}

	const runOCRAndAI = async () => {
	    try {
		const compressedUri = await compressImage(imageUri as string);
		if (!compressedUri) throw new Error("Compression failed");

		const base64 = await convertImageToBase64(compressedUri);
		if (!base64) throw new Error("Failed to convert image to base64");

		const formData = new FormData();
		formData.append("base64Image", `data:image/jpeg;base64,${base64}`);
		formData.append("apikey", "YOUR_OCR_SPACE_API_KEY");
		formData.append("OCREngine", "2");

		const res = await fetch("https://api.ocr.space/parse/image", {
		    method: "POST",
		    body: formData,
		});

		const json = await res.json();

		if (!json.ParsedResults || !json.ParsedResults[0]?.ParsedText) {
		    throw new Error("No text found");
		}

		const parsedText = json.ParsedResults[0].ParsedText;
		setRecognizedText(parsedText);

		const aiResult = await ai.models.generateContent({
		    model: "gemini-2.0-flash",
		    contents: parsedText,
		});

		setAiResponse(aiResult.text);
	    } catch (err: any) {
		console.error(err);
		setErrorMessage(err.message || "Something went wrong.");
	    } finally {
		setLoading(false);
	    }
	};

	runOCRAndAI();
    }, [imageUri]);

    return (
	<SafeAreaView style={styles.screen}>
	    <StatusBar style="light" />
	    <ScrollView contentContainerStyle={styles.scrollContainer}>
		<Text style={styles.title}>Image Preview</Text>
		{imageUri ? (
		    <Image
			source={{ uri: imageUri as string }}
			style={styles.image}
			resizeMode="contain"
		    />
		) : (
		    <Text style={styles.errorText}>No image selected.</Text>
		)}

		<View style={styles.section}>
		    <Text style={styles.sectionTitle}>OCR Result</Text>
		    {loading ? (
			<ActivityIndicator size="large" color="#00f" />
		    ) : errorMessage ? (
			<Text style={styles.errorText}>{errorMessage}</Text>
		    ) : (
			<Text style={styles.resultText}>{recognizedText}</Text>
		    )}
		</View>

		{aiResponse && (
		    <View style={styles.section}>
			<Text style={styles.sectionTitle}>Gemini Summary</Text>
			<Text style={styles.resultText}>{aiResponse}</Text>
		    </View>
		)}
	    </ScrollView>
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
	flex: 1,
	backgroundColor: "#0e0e11",
    },
    scrollContainer: {
	padding: 20,
	alignItems: "center",
    },
    title: {
	fontSize: 22,
	fontWeight: "bold",
	color: "#fff",
	marginBottom: 10,
    },
    image: {
	width: "100%",
	height: 250,
	borderRadius: 8,
	marginBottom: 20,
    },
    section: {
	width: "100%",
	marginTop: 20,
    },
    sectionTitle: {
	fontSize: 18,
	fontWeight: "600",
	color: "#f1f1f1",
	marginBottom: 8,
    },
    resultText: {
	fontSize: 16,
	lineHeight: 22,
	color: "#d0d0d0",
	backgroundColor: "#1a1a1d",
	padding: 12,
	borderRadius: 6,
    },
    errorText: {
	color: "red",
	textAlign: "center",
	fontSize: 16,
	marginTop: 10,
    },
});
