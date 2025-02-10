import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { Link, useRouter } from "expo-router";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function getStarted() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-backgroundColor items-center justify-center">
      <Text className="text-chiggaYellow text-center text-[40px] font-[Cinzel]">
        GRAPHPIX
      </Text>
      <Text className="text-chiggaYellow text-center mt-24 text-[25px] px-20">
        Ready to translate some graphs today?
      </Text>

      <TouchableOpacity
        className="bg-yellow-400 px-6 py-3 mt-20 rounded-full w-60 self-center"
        onPress={() => router.push("/mainpage")}
      >
        <Text className="text-black text-lg font-bold text-center">
          Get Started
        </Text>
      </TouchableOpacity>

      <Link
        className="text-chiggaYellow text-center p-25 pt-10"
        href="/mainpage"
      >
        Learn More
      </Link>
      <StatusBar backgroundColor="#011121" />
    </SafeAreaView>
  );
}
