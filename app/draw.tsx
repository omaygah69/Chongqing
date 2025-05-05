import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Signature from 'react-native-signature-canvas';
import NavBar from './navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DrawingPage() {
    const ref = useRef();
    const [penColor, setPenColor] = useState('black');
    const [isEraser, setIsEraser] = useState(false);

    const handleOK = (signature) => {
        console.log('Drawing saved as base64:', signature);
    };

    const handleClear = () => {
        ref.current?.clearSignature();
        console.log("Canvas cleared");
    };

    const handleSave = () => {
        ref.current?.readSignature();
    };

    const changeColor = (color) => {
        setIsEraser(false);
        setPenColor(color);
        ref.current?.changePenColor(color);
    };

    const activateEraser = () => {
        setIsEraser(true);
        setPenColor('#FFFFFF'); // White acts as eraser
        ref.current?.changePenColor('#FFFFFF');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Signature
                ref={ref}
                onOK={handleOK}
                onClear={handleClear}
                autoClear={false}
                descriptionText="Draw anything here"
                clearText="Clear"
                confirmText="Save"
                penColor={penColor}
                webStyle={`
                    .m-signature-pad--footer { display: none; }
                    body,html { height: 100%; margin: 0; }
                    .m-signature-pad { flex: 1; }
                `}
            />

            {/* Floating Controls Panel */}
            <View style={styles.controlsWrapper}>
                <Text style={styles.controlsTitle}>Tools</Text>

                {/* Color Options */}
                <View style={styles.colorRow}>
                    {['black', 'red', 'blue', 'green'].map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorButton,
                                {
                                    backgroundColor: color,
                                    borderColor: penColor === color && !isEraser ? '#000' : '#ccc',
                                },
                            ]}
                            onPress={() => changeColor(color)}
                        />
                    ))}
                    <TouchableOpacity
                        style={[
                            styles.colorButton,
                            {
                                backgroundColor: '#FFF',
                                borderWidth: 2,
                                borderColor: isEraser ? '#000' : '#ccc',
                            },
                        ]}
                        onPress={activateEraser}
                    >
                        <Text style={styles.eraserText}>E</Text>
                    </TouchableOpacity>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => ref.current?.undo()}>
                        <Text style={styles.buttonText}>Undo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleClear}>
                        <Text style={styles.buttonText}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: 60 }} /> {/* Space for NavBar */}
            <NavBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    controlsWrapper: {
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#ffffffee',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 8,
    },
    controlsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    colorRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    colorButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eraserText: {
        color: '#000',
        fontSize: 12,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    actionButton: {
        backgroundColor: '#1e3a8a',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
