import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

export default function NavBar()
{
    const router = useRouter();
    
    return (
	<View className="absolute bottom-0 left-0 right-0 h-[70px] flex-row bg-black/70 justify-around items-center border-t-2 border-[#ffe059]">
	    <TouchableOpacity className="items-center" onPress={() => router.push("/gallery")}>
		<Ionicons name="image" size={20} color="#ffe059" />
		<Text className="text-[#ffe059] text-[10px] mt-1">Gallery</Text>
	    </TouchableOpacity>

	    <TouchableOpacity className="items-center" onPress={() => router.push("/draw")}>
		<Ionicons name="brush" size={20} color="#ffe059" />
		<Text className="text-[#ffe059] text-[10px] mt-1">Draw</Text>
	    </TouchableOpacity>

	    <TouchableOpacity className="items-center" onPress={() => router.push("/camera")}>
		<Ionicons name="camera" size={30} color="#ffe059" />
		<Text className="text-[#ffe059] text-[10px] mt-1">Scan</Text>
	    </TouchableOpacity>

	    <TouchableOpacity className="items-center">
		<MaterialIcons name="translate" size={20} color="#ffe059" />
		<Text className="text-[#ffe059] text-[10px] mt-1">Translate</Text>
	    </TouchableOpacity>

	    <TouchableOpacity className="items-center" onPress={() => router.push("/wiki")}>
		<AntDesign name="book" size={20} color="#ffe059" />
		<Text className="text-[#ffe059] text-[10px] mt-1">Read</Text>
	    </TouchableOpacity>
	</View>
    )
}


