import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Platform,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

const SettingsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const settingsOptions = [
	{ label: "Profile", value: "profile", icon: <Ionicons name="person" size={18} color="#444" /> },
	{ label: "Settings", value: "settings", icon: <Ionicons name="settings" size={18} color="#444" /> },
	{ label: "Notifications", value: "notifications", icon: <Ionicons name="notifications" size={18} color="#444" /> },
	{ label: "Help", value: "help", icon: <Feather name="help-circle" size={18} color="#444" /> },
	{ label: "Contact Us", value: "contact", icon: <MaterialIcons name="email" size={18} color="#444" /> },
	{ label: "Logout", value: "logout", icon: <MaterialIcons name="logout" size={18} color="#444" /> },
    ];

    const toggleDropDown = () => {
	setIsOpen(!isOpen);
    };

    const selectOption = (value) => {
	setSelectedValue(value);
	setIsOpen(false);

	// Example: Handle navigation or actions here
	switch (value) {
	    case "logout":
		console.log("Logging out...");
		break;
	    case "profile":
		console.log("Navigate to profile...");
		break;
		// Add more cases as needed
	    default:
		console.log(`Selected: ${value}`);
	}
    };

    return (
	<View style={{ position: "relative" }}>
	    {/* Menu Button */}
	    <TouchableOpacity style={{ marginLeft: 16 }} onPress={toggleDropDown}>
		<Ionicons name="menu" size={35} color="#ffe059" />
	    </TouchableOpacity>

	    {isOpen && (
		<View style={styles.dropdown}>
		    <FlatList
			data={settingsOptions}
			     keyExtractor={(item) => item.value}
			     renderItem={({ item }) => (
				 <TouchableOpacity
				     style={styles.option}
					   onPress={() => selectOption(item.value)}
				 >
				     <View style={{ flexDirection: "row", alignItems: "center" }}>
					 {item.icon}
					 <Text style={{ fontSize: 15, marginLeft: 10 }}>
					     {item.label}
					 </Text>
				     </View>
				 </TouchableOpacity>
			     )}
		    />
		</View>
	    )}
	</View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
	position: "absolute",
	top: 42,
	right: 0,
	width: 200,
	borderWidth: 1,
	borderColor: "#ccc",
	borderRadius: 5,
	backgroundColor: "#FFFFFF",
	zIndex: 100,

	...(Platform.OS === "web"
	  ? { boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }
	  : {}),

	...(!(Platform.OS === "web")
	  ? {
	      elevation: 3,
	      shadowColor: "#000",
	      shadowOffset: { width: 0, height: 3 },
	      shadowOpacity: 0.4,
	      shadowRadius: 5,
	  }
	  : {}),
    },
    option: {
	padding: 15,
	borderBottomWidth: 1,
	borderBottomColor: "#eee",
    },
});

export default SettingsMenu;
