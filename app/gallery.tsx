import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";

export default function Gallery(){
    const router = useRouter();
    const [ albums, setAlbums ] = useState<MediaLibrary.Album | any>(null);
    const [ permissionResponse, requestPermission ] = MediaLibrary.usePermissions();
    const [ permissionGranted, setPermissionGranted ] = useState(false);

    useEffect(() => {
	const fetchAlbumsAgain = async () => {
	    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
		includeSmartAlbums: true,
	    });

	    setAlbums(fetchedAlbums);
	    setPermissionGranted(true);
	};
	if (permissionResponse?.status === "granted") {
	    fetchAlbumsAgain();
	}
    }, [permissionResponse]);

    async function getAlbums() {
	if (permissionResponse?.status !== "granted") {
	    await requestPermission();
	}
	const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
	    includeSmartAlbums: true,
	});
	setPermissionGranted(true);
	setAlbums(fetchedAlbums);
    }

    return (
	<SafeAreaView className="flex justify-center items-center h-full bg-backgroundColor">
	    {permissionGranted ? (
		<View className="flex items-center w-full pb-11 h-full">
		    <View className="flex items-center w-full">
			<View className="w-full items-end pr-3">
			    <TouchableOpacity onPress={() => router.back()}>
				<Feather
				    name="arrow-up-circle"
				    color={"#ffe059"}
				    size={32}
				    className="mt-4"
				/>
			    </TouchableOpacity>
			</View>
			<Text className="text-4xl tracking-widest text-chiggaYellow pb-6">
			    Gallery
			</Text>
		    </View>
		    <ScrollView>
			{albums &&
			 albums.map((album: any, index: any) => (
			     <AlbumEntry album={album} key={index} />
			))}
		    </ScrollView>
		</View>
	    ) : (
		<TouchableOpacity
		    className="bg-chiggaYellow px-6 py-4 rounded-lg"
		    onPress={getAlbums}
		>
		    <Text className="text-2xl font-semibold">Get Albums</Text>
		</TouchableOpacity>
	    )}
	</SafeAreaView>
    )
}

function AlbumEntry({ album }: any) {
    const [assets, setAssets] = useState<MediaLibrary.Asset[] | any>([]);

    useEffect(() => {
	async function getAlbumAssets() {
	    const albumAssets = await MediaLibrary.getAssetsAsync({ album: album.id }); //?
	    setAssets(albumAssets.assets);
	}
	getAlbumAssets();
    }, [album]);

    return (
	<View key={album.id} style={styles.albumContainer}>
	    <Text className="text-white">
		{album.title} - {album.assetCount ?? "no"} assets
	    </Text>
	    <View className="flex-row flex-wrap gap-2">
		{assets &&
		 assets.map((asset: any, index: any) => (
		     <Image
			 source={{ uri: asset.uri }}
			 width={100}
			 height={100}
			 key={index}
		     />
		))}
	    </View>
	</View>
    );
}

const styles = StyleSheet.create({
    albumContainer: {
	paddingHorizontal: 20,
	marginBottom: 12,
	gap: 4,
    },
});
