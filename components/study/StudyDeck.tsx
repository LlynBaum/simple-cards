import {Deck} from "@/constants/Types";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {IconButton} from "react-native-paper";

export interface StudyDeckProps {
    deck: Deck;
    currentCardIndex: number;
    nextCard: (correct: boolean) => void;
}

export const StudyDeck = ({deck, currentCardIndex, nextCard}: StudyDeckProps) => {
    const [showFront, setShowFront] = useState(true);

    const handleFlip = () => {
        setShowFront(!showFront);
    };

    const handleNextCard = (correct: boolean) => {
        setShowFront(true);
        nextCard(correct);
    };

    const currentCard = deck.cards[currentCardIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.cardText}>
                {showFront ? currentCard.front : currentCard.back}
            </Text>
            <View style={styles.buttons}>
                {!showFront && (
                    <IconButton icon="close" mode="contained" onPress={() => handleNextCard(false)}/>
                )}
                <IconButton icon="rotate-3d-variant" mode="contained" onPress={handleFlip}/>
                {!showFront && (
                    <IconButton icon="check" mode="contained" onPress={() => handleNextCard(true)}/>
                )}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    cardText: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: "100%"
    }
});