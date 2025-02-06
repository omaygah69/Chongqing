import { Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import "../global.css"
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

export default function(){
    const [ facing, setFacing ] = useState<CameraType>("back");
    const [ permission, requestPermission ] = useCameraPermissions();

    if(!permission){
	return <View />
    }

    if(!permission.granted){
	return (
	    <View className="flex-1 justify-center">
		<Text className="text-center text-xl">We need your permission to use camera.</Text>

		<TouchableOpacity className="bg-yellow-400 px-6 py-3 mt-20 rounded-full w-60 self-center"
				  onPress={requestPermission}>
		    <Text className="text-black text-lg font-bold text-center">Grant Permission</Text>
		</TouchableOpacity>

	    </View>
	)
    }

    function toggleCameraFacing() {
	setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    
    return (
	<View className="flex-1 w-full h-full">
            <CameraView className="absolute top-0 left-0 w-full h-full" facing={facing} />

            <View className="absolute bottom-10 left-0 right-0 flex items-center">
		<TouchableOpacity className="bg-yellow-400 px-8 py-3 rounded-full"
                                  onPress={toggleCameraFacing}>
                    <Text className="text-m font-bold text-black text-center">Flip Camera</Text>
		</TouchableOpacity>
            </View>
	</View>
    );
}
