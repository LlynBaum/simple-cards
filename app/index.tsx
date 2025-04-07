import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useCallback, useState} from "react";
import {FAB} from 'react-native-paper';
import {Deck} from "@/constants/Types";
import {useFocusEffect} from "expo-router";
import Loading from "@/components/Loading";
import NewDeckDialog from "@/components/dialogs/NewDeckDialog";

const Index = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showNewDeckDialog, setShowNewDeckDialog] = useState(false);

    const getDecks = useCallback(() => {
        setIsLoading(true);
        fetch("https://flashcard.darki.dev/api/decks")
            .then(res => res.json())
            .then(setDecks)
            .then(() => setIsLoading(false))
            .catch(e => {
                setIsLoading(false);
                alert("There was a problem while loading the deck!");
                console.error(e);
            });
    }, []);

    const createDeck = useCallback((name: string) => {
        setIsLoading(true);
        fetch("https://flashcard.darki.dev/api/decks", {
            method: "POST",
            body: JSON.stringify({name: name})
        })
            .then(res => {
                if(!res.ok){
                    alert("There was a problem while creating the deck!");
                    setIsLoading(false);
                    return;
                }
                return getDecks()
            })
            .catch(e => {
                setIsLoading(false);
                alert("There was a problem while loading the decks!");
                console.error(e);
            })
    }, []);

    useFocusEffect(getDecks);

    if (isLoading) {
        return (
            <>
                <Text style={styles.title}>Hallo!</Text>
                <Loading/>
            </>
        )
    }

    return (
        <>
            <ScrollView>
                <Text style={styles.title}>Hallo!</Text>
                <View style={styles.container}>
                    {decks.map(d => <Text>{d.name}</Text>)}
                </View>
            </ScrollView>
            <FAB
                icon="plus"
                style={styles.fab}
                color="#21005D"
                onPress={() => setShowNewDeckDialog(true)}
            />
            <NewDeckDialog
                visible={showNewDeckDialog}
                onConfirm={createDeck}
                onCancel={() => setShowNewDeckDialog(false)}/>
        </>
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
    },
    fab: {
        position: "absolute",
        right: 10,
        bottom: 10,
        margin: 16,
        backgroundColor: "#EADDFF",
    }
});

export default Index;