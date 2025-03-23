import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import ExpoDraw from "expo-draw";

export default function Draw() {
    const [theColor, setColor] = useState("black");
    const [theWidth, setWidth] = useState(5);
    const undoRef = useRef(null);
    const clearRef = useRef(null);

    return (
        <View className="flex-1 bg-backgroundColor items-center justify-center py-10">
	    <ExpoDraw
		className="w-full"
                strokes={[]}
                containerStyle={{ backgroundColor: "white" }}
                rewind={(undo) => (undoRef.current = undo)}
                clear={(clear) => (clearRef.current = clear)}
                color={theColor}
                strokeWidth={theWidth}
                enabled={true}
                onChangeStrokes={(strokes) => console.log(strokes)}
	    />
	    
            <View style={styles.controls}>
                <Button title="Undo" onPress={() => undoRef.current && undoRef.current()} />
                <Button title="Clear" onPress={() => clearRef.current && clearRef.current()} />
                <Button title="Change Color" onPress={() => setColor(theColor === "black" ? "red" : "black")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: "row",
        marginTop: 10,
    },
});
