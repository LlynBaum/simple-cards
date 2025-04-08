import {Card, Deck} from "@/constants/Types";
import {useCallback, useState} from "react";
import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import Loading from "@/components/Loading";
import {StyleSheet, Text, View} from "react-native";
import {IconButton} from "react-native-paper";
import {StudyDeck} from "@/components/study/StudyDeck";
import {StudyResult} from "@/components/study/StudyResult";

const shuffleArray = (array: Card[]) => {
    return array.sort(() => Math.random() - 0.5);
};

const StudyDeckScreen = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams<{ id: string }>();
    const [deck, setDeck] = useState<Deck>({} as Deck);

    const [correctCount, setCorrectCount] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useFocusEffect(useCallback(() => {
        setIsLoading(true);
        fetch(`https://flashcard.darki.dev/api/decks?id=${id}`)
            .then(res => res.json())
            .then((response: Deck) => {
                const shuffledCards = shuffleArray(response.cards);
                setDeck({...response, cards: shuffledCards});
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                alert("There was a problem while loading the deck!");
                console.error(e);
            });
    }, [id]));

    if (isLoading) {
        return <Loading/>;
    }

    const handleNextCard = (correct: boolean) => {
        if (correct) {
            setCorrectCount(i => i + 1);
        }

        if (currentCardIndex <= deck!.cards.length - 1) {
            setCurrentCardIndex(i => i + 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{alignSelf: "center", fontSize: 20}}>{deck.name}</Text>
                <IconButton icon="close" iconColor="black" style={{alignSelf: "center"}} size={24} onPress={() => router.back()}/>
            </View>
            {
                currentCardIndex <= deck.cards.length - 1 ? (
                    <StudyDeck deck={deck} currentCardIndex={currentCardIndex} nextCard={handleNextCard}/>
                ) : (
                    <StudyResult deck={deck} correctCount={correctCount} />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 16,
        gap: 50
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 100,
        marginVertical: 5,
    },
    cardText: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default StudyDeckScreen;