import {Card} from "@/constants/Types";
import {Card as PaperCard, IconButton} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import DeleteCardDialog from "@/components/dialogs/DeleteCardDialog";
import {useState} from "react";

const CardView = ({card}: { card: Card }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

    return (
        <>
            <PaperCard style={{backgroundColor: "#FEF7FF", width: "80%", alignSelf: "center"}}>
                <PaperCard.Content
                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text>{card.front}</Text>
                    <View style={{flexDirection: "row"}}>
                        <IconButton icon="pencil" iconColor="black" style={styles.icon} onPress={() => {
                        }}/>
                        <IconButton icon="delete" iconColor="black" style={styles.icon}
                                    onPress={() => setShowDeleteDialog(true)}/>
                    </View>
                </PaperCard.Content>
            </PaperCard>
            <DeleteCardDialog
                visible={showDeleteDialog}
                card={card}
                onCancel={() => setShowDeleteDialog(false)}
                onConfirm={() => {
                }}
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