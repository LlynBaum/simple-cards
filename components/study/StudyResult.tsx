import {Deck} from "@/constants/Types";
import {useRouter} from "expo-router";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-paper";

export const StudyResult = ({deck, correctCount}: { deck: Deck, correctCount: number }) => {
    const router = useRouter();

    const correctPercentage = Math.round((correctCount / deck.cards.length) * 100);

    const incorrectCount = deck.cards.length - correctCount;
    const incorrectPercentage = Math.round((incorrectCount / deck.cards.length) * 100);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Completed!</Text>
            <View>
                <Text style={styles.result}>Correct: {correctPercentage}%</Text>
                <Text style={styles.result}>Wrong: {incorrectPercentage}%</Text>
            </View>
            <View style={styles.buttons}>
                <Button mode="contained" onPress={() => router.dismissAll()}>
                    Home
                </Button>
                <Button mode="contained" onPress={() => router.replace(`/study/${deck.id}`)}>
                    Retry
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 70
    },
    result: {
        fontSize: 20,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 70,
    }
});