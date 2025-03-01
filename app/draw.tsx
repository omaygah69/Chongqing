import React, { useState } from "react";
import { View, Button } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const draw = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");

  const handleTouchMove = (event) => {
    const { x, y } = event.nativeEvent;
    setCurrentPath((prevPath) => `${prevPath} ${x},${y}`);
  };

  const handleTouchEnd = () => {
    if (currentPath) {
      setPaths([...paths, currentPath]);
      setCurrentPath("");
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath("");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <PanGestureHandler onGestureEvent={handleTouchMove} onEnded={handleTouchEnd}>
          <Canvas style={{ flex: 1 }}>
            {paths.map((d, index) => (
              <Path key={index} path={Skia.Path.MakeFromSVGString(`M${d}`)} color="black" style="stroke" strokeWidth={2} />
            ))}
            {currentPath && (
              <Path path={Skia.Path.MakeFromSVGString(`M${currentPath}`)} color="black" style="stroke" strokeWidth={2} />
            )}
          </Canvas>
        </PanGestureHandler>
        <Button title="Clear" onPress={clearCanvas} />
      </View>
    </GestureHandlerRootView>
  );
};

export default draw;
