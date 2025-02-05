import { View, Text, TouchableOpacity } from "react-native"
import { Link, useRouter } from "expo-router"
import "../global.css"

export default function MainPage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-chiggaYellow">Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
