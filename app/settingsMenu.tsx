import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../global.css";

const SettingsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const settingsOptions = [
        { label: "Kill Yourself?", value: "option1" },
        { label: "SayGex", value: "option2" },
        { label: "Contact Us", value: "option3" },
    ];

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    return (
        <View className="relative">
            {/* Menu Button */}
            <TouchableOpacity className="ml-4" onPress={toggleDropDown}>
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
                                <Text className="text-[15]">{item.label}</Text>
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
        elevation: 2, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 100, // Ensures it appears on top
    },
    option: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
});

export default SettingsMenu;
