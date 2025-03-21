import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

export default function OCRScreen() {
    const { imageUri } = useLocalSearchParams();
    const [recognizedText, setRecognizedText] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
	const processImage = async () => {
	    if (!imageUri) {
		setErrorMessage("No image provided");
		setLoading(false);
		return;
	    }

	    try {
		console.log("Processing image:", imageUri); // Debug log
		
		Tesseract.recognize(
		    imageUri,
		    "eng",
		    {
			logger: (m) => console.log(m),
		    }
		).then( ({ data: {text} }) => {
		    console.log("OCR Result:", text);
		    setRecognizedText(text || "No text recognized");
		});
	    } catch (error) {
		console.error("OCR Error:", error);
		setErrorMessage("Failed To Recognize Text.");
	    }
	    setLoading(false);
	};

	processImage();
    }, [imageUri]);

    return (
	<ScrollView contentContainerStyle={styles.container}>
	    {imageUri ? (
		<Image source={{ uri: imageUri }} style={styles.image} />
	    ) : (
		<Text style={styles.errorText}>No image provided</Text>
	    )}
	    {loading ? (
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
