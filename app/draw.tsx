import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Signature from 'react-native-signature-canvas';

export default function DrawingPage() {
    const ref = useRef();
    const handleOK = (signature) => {
	console.log('Drawing saved as base64:', signature);
    };
    const handleClear = () => {
	console.log('Canvas cleared');
    };

    return (
	<View style={styles.container}>
	    <Signature
		ref={ref}
		onOK={handleOK}
		onClear={handleClear}
		autoClear={false}
		descriptionText="Draw anything here"
		clearText="Clear"
		confirmText="Save"
		webStyle={`
          .m-signature-pad--footer { display: none; margin: 0; }
          body,html {
            height: 100%;
          }
		`}
	    />
	</View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
