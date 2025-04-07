import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6750A4" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    }
});

export default Loading;