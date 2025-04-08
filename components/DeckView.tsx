import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {Deck} from "@/constants/Types";
import {Card, IconButton} from "react-native-paper";
import DeleteDeckDialog from "@/components/dialogs/DeleteDeckDialog";
import {useCallback, useState} from "react";

const DeckView = ({deck}: { deck: Deck }) => {
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const onDelete = useCallback(() => {
        setShowDeleteDialog(false);
        fetch("https://flashcard.darki.dev/api/decks", {
            method: "DELETE",
            body: JSON.stringify({id: deck.id})
        })
            .then(res => {
                if (!res.ok) {
                    alert("There was a problem while deleting the deck!");
                }
                router.replace("/");
            })
            .catch(e => {
                alert("There was a problem while deleting the deck!");
                console.error(e);
            })
    }, [deck.id])

    return (
        <>
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
                                onPress={() => setShowDeleteDialog(true)}
                                style={styles.delete}
                            />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
            <DeleteDeckDialog
                visible={showDeleteDialog}
                deck={deck}
                onConfirm={onDelete}
                onCancel={() => setShowDeleteDialog(false)}/>
        </>
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