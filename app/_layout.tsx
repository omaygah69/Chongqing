import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="mainpage" options={{ headerShown: false }} />
                <Stack.Screen name="camera" options={{ headerShown: false }} />
                <Stack.Screen name="gallery" options={{ headerShown: false }} />
                <Stack.Screen name="ocrcreen" options={{ headerShown: false }} />
                <Stack.Screen name="draw" options={{ headerShown: false }} />
            </Stack>
        </>
    );
}
