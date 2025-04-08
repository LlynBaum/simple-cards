import {Card} from "@/constants/Types";
import {Card as PaperCard, IconButton} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import DeleteCardDialog from "@/components/dialogs/DeleteCardDialog";
import {useCallback, useState} from "react";
import {useRouter} from "expo-router";

const CardView = ({card}: { card: Card }) => {
    const router = useRouter();
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    const onDelete = useCallback(() => {
        setShowDeleteDialog(false);
        fetch("https://flashcard.darki.dev/api/cards", {
            method: "DELETE",
            body: JSON.stringify({id: card.id})
        }).then(res => {
            if(!res.ok){
                alert("There was a problem while deleting the card!");
                return;
            }
            router.push(`/deck/${card.deckId}`);
        })
            .catch(e => {
                alert("There was a problem while deleting the card!");
                console.error(e);
            });
    }, [card.id]);

    const onEdit = useCallback(() => {
        router.push(`/card/${card.id}`);
    }, [card.id]);

    return (
        <>
            <PaperCard style={{backgroundColor: "#FEF7FF", width: "80%", alignSelf: "center"}}>
                <PaperCard.Content
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text>{card.front}</Text>
                    <View style={{flexDirection: "row"}}>
                        <IconButton icon="pencil" iconColor="black" style={styles.icon} onPress={onEdit}/>
                        <IconButton icon="delete" iconColor="black" style={styles.icon}
                                    onPress={() => setShowDeleteDialog(true)}/>
                    </View>
                </PaperCard.Content>
            </PaperCard>
            <DeleteCardDialog
                visible={showDeleteDialog}
                card={card}
                onCancel={() => setShowDeleteDialog(false)}
                onConfirm={onDelete}
            />
        </>
    )
}

const styles = StyleSheet.create({
    icon: {
        borderWidth: 0,
        backgroundColor: "transparent",
    }
})

export default CardView;