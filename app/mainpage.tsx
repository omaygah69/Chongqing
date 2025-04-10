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
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainPage() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-backgroundColor">
      <View className="absolute mt-16 top-0 left-0 right-0 bg-[#020528] flex-row justify-between items-center px-5 pt-6 z-10">
        <Text className="text-[#ffe059] text-[35px] font-regular font-[MadeCarvingSoft-Regular]">
          GRAPHPIX
        </Text>

        <View className="flex-row">
          <TouchableOpacity className="ml-4">
            <Ionicons name="search" size={35} color="#ffe059" />
          </TouchableOpacity>
          <SettingsMenu />
        </View>
      </View>

      <ImageBackground
        source={pagelogo}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>

      <View className="absolute bottom-0 left-0 right-0 h-[90px] flex-row bg-black/70 justify-around items-center border-t-2 border-[#ffe059]">
        <TouchableOpacity
          className="items-center"
          onPress={() => router.push("/gallery")}
        >
          <Ionicons name="image" size={35} color="#ffe059" />
          <Text className="text-[#ffe059] text-[15px] mt-1">Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => router.push("/draw")}
        >
          <Ionicons name="brush" size={35} color="#ffe059" />
          <Text className="text-[#ffe059] text-[15px] mt-1">Draw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => router.push("/camera")}
        >
          <Ionicons name="camera" size={50} color="#ffe059" />
          <Text className="text-[#ffe059] text-[15px] mt-1">Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialIcons name="translate" size={35} color="#ffe059" />
          <Text className="text-[#ffe059] text-[15px] mt-1">Translate</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialIcons name="arrow-circle-up" size={35} color="#ffe059" />
          <Text className="text-[#ffe059] text-[15px] mt-1">Import</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" backgroundColor="#011121" />
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
