import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar, View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function RootLayout() {
    const pathname = usePathname();
    const router = useRouter();
    /* const hideBottomBar = pathname === "/" || pathname === "/index" || pathname === "/draw" || pathname === "/camera"; */

    return (
	<>
	    <StatusBar barStyle="dark-content" />
	    <Stack>
		<Stack.Screen name="index" options={{ headerShown: false }} />
		<Stack.Screen name="mainpage" options={{ headerShown: false }} />
		<Stack.Screen name="camera" options={{ headerShown: false }} />
		<Stack.Screen name="gallery" options={{ headerShown: false }} />
		<Stack.Screen name="ocrscreen" options={{ headerShown: false }} />
		<Stack.Screen name="draw" options={{ headerShown: false }} />
	    </Stack>
	</>
    );
}
