import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";

export default function DB() {
    const db = SQLite.openDatabase('example.db');
    const [isLoading, setIsLoading] = useState(true);
    const [names, setNames] = useState([]);
    const [currentName, setCurrentName] = useState(undefined)

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text> Loading.. </Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Hi</Text>
            <StatusBar style="auto" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})