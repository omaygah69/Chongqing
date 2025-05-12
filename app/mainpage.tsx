import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import pagelogo from "../assets/images/pagelogo.jpeg";
import SettingsMenu from "./settingsMenu";
import NavBar from "./navbar";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage() {
    const router = useRouter();
    return (
	<SafeAreaView className="flex-1 bg-backgroundColor">
	    <View className="absolute mt-9 top-0 left-0 right-0 bg-[#020528] flex-row justify-between items-center px-5 pt-6 z-10">
		<Text className="text-[#ffe059] text-[25px] font-regular font-[MadeCarvingSoft-Regular]">
		    GRAPHPIX
		</Text>

		<View className="flex-row">
		    {/* <TouchableOpacity className="ml-4">
			<Ionicons name="search" size={30} color="#ffe059" />
			</TouchableOpacity> */}
		    <SettingsMenu />
		</View>
	    </View>

	    <ImageBackground
		source={pagelogo}
		resizeMode="cover"
		style={styles.image}
	    ></ImageBackground>
	    
	    <StatusBar style="light" backgroundColor="#011121" />
	    <NavBar/>
	</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    image: {
	width: "100%",
	height: "100%",
	resizeMode: "cover",
	justifyContent: "center",
    },
});
