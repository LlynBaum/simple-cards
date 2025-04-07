import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useCallback, useState} from "react";
import {Deck} from "@/constants/Types";
import {useFocusEffect} from "expo-router";

const Index = () => {
    const [decks, setDecks] = useState<Deck[]>([]);

    useFocusEffect(useCallback(() => {
        fetch("https://flashcard.darki.dev/api/decks")
            .then(res => res.json())
            .then(setDecks)
            .catch(e => {
                alert("There was a problem while loading the deck!");
                console.error(e);
            });
    }, []));

    return (
        <ScrollView>
            <Text style={styles.title}>Hallo!</Text>
            <View style={styles.container}>
                {decks.map(d => <Text>{d.name}</Text>)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    }
});

export default Index;