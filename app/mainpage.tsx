import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router"
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import pagelogo from "@/assets/images/pagelogo.jpeg"
import "../global.css"

export default function MainPage() {
    return (
	<View className="flex-1 bg-backgroundColor">
	    <View className="absolute top-0 left-0 right-0 h-16 bg-[#020528] flex-row justify-between items-center px-5 pt-6 z-10">
		<Text className="text-[#ffe059] text-[35px] font-regular font-[MadeCarvingSoft-Regular]">GRAPHPIX</Text>

		<View className="flex-row">
                    <TouchableOpacity className="ml-4">
			<Ionicons name="search" size={35} color="#ffe059" />
                    </TouchableOpacity>

                    <TouchableOpacity className="ml-4">
			<Ionicons name="menu" size={35} color="#ffe059" />
                    </TouchableOpacity>
		</View>
            </View>
	    
	    <Text className="text-chiggaYellow">Edit app/index.tsx to edit this screen.</Text>

	    <ImageBackground
		source={pagelogo}
		resizeMode="cover"
		style={styles.image}
	    >
	    </ImageBackground>

	    <View className="absolute bottom-0 left-0 right-0 h-[90px] flex-row bg-black/70 justify-around items-center border-t-2 border-[#ffe059]">
                <TouchableOpacity className="items-center">
                    <Ionicons name="image" size={35} color="#ffe059" />
                    <Text className="text-[#ffe059] text-[15px] mt-1">Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Ionicons name="brush" size={35} color="#ffe059" />
                    <Text className="text-[#ffe059] text-[15px] mt-1">Draw</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <Ionicons name="camera" size={50} color="#ffe059" />
                    <Text className="text-[#ffe059] text-[15px] mt-1">Scan</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <MaterialIcons name="translate" size={35} color="#ffe059" />
                    <Text className="text-[#ffe059] text-[15px] mt-1">Saygex?</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center">
                    <MaterialIcons name="arrow-circle-up" size={35} color="#ffe059" />
                    <Text className="text-[#ffe059] text-[15px] mt-1">Saygex?</Text>
                </TouchableOpacity>
            </View>

	</View>
    );
}

const styles = StyleSheet.create({
    image: {
	width: "100%",
	height: "100%",
	resizeMode: "cover",
	justifyContent: "center",
    }
});
