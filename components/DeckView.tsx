import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {Deck} from "@/constants/Types";
import {Card, IconButton} from "react-native-paper";

const DeckView = ({deck}: { deck: Deck }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/deck/${deck.id}`)}
            style={styles.container}>
            <Card style={{backgroundColor: "#FEF7FF"}}>
                <Card.Content>
                    <View style={styles.card}>
                        <View style={{gap: 5}}>
                            <Text style={styles.title}>{deck.name}</Text>
                            <Text style={{fontSize: 14}}>
                                {deck.cards.length} {deck.cards.length > 1 ? "Cards" : "Card"}
                            </Text>
                        </View>
                        <IconButton
                            icon="delete"
                            iconColor="black"
                            onPress={() => {}}
                            style={styles.delete}
                        />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        paddingTop: 10
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    delete: {
        backgroundColor: "transparent",
        borderWidth: 0
    }
});

export default DeckView;