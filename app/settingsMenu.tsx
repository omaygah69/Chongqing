import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const settingsOptions = [
        { label: "Profile", value: "profile" },
        { label: "Settings", value: "settings" },
        { label: "Contact Us", value: "contact" },
    ];

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
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
                                <Text style={{ fontSize: 15 }}>{item.label}</Text>
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

        // Shadows for Web
        ...(Platform.OS === "web"
            ? { boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }
            : {}),

        // Shadows for iOS & Android
        ...(!(Platform.OS === "web")
            ? {
                elevation: 3, // Android shadow
                shadowColor: "#000", // iOS shadow
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 5,
            }
            : {}),
    },
    option: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default SettingsMenu;
