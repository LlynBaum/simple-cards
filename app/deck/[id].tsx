import {Stack, useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useCallback, useState} from "react";
import {Deck} from "@/constants/Types";
import Loading from "@/components/Loading";
import {ScrollView, StyleSheet, View} from "react-native";
import CardView from "@/components/CardView";
import {Button} from "react-native-paper";

const DeckScreen = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams<{ id: string }>();

    const [deck, setDeck] = useState<Deck>({} as Deck);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setIsLoading(true);
        fetch(`https://flashcard.darki.dev/api/decks?id=${id}`)
            .then(res => res.json())
            .then(deck => {
                setDeck(deck);
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                alert("There was a problem while loading the deck!");
                console.error(e);
            });
    }, [id]));

    if (isLoading) {
        return (
            <>
                <Stack.Screen options={{title: "Loading..."}}/>
                <Loading/>
            </>
        )
    }

    return (
        <>
            <Stack.Screen options={{title: deck.name}}/>
            <ScrollView>
                <View style={styles.container}>
                    {deck.cards.map(card => <CardView card={card}/>)}
                    <Button
                        icon="plus"
                        mode="contained"
                        style={styles.create}
                        onPress={() => router.push(`/card/new?deckId=${deck?.id}`)}
                    >
                        Create
                    </Button>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        marginTop: 50,
        gap: 30
    },
    create: {
        width: 100,
        alignSelf: "center"
    },
});

export default DeckScreen;