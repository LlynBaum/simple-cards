import {Button, Dialog, Paragraph, Portal} from "react-native-paper";
import {Deck} from "@/constants/Types";
import {StyleSheet} from "react-native";

interface DeleteDeckDialogProps {
    visible: boolean;
    deck: Deck;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteDeckDialog = ({visible, deck, onCancel, onConfirm}: DeleteDeckDialogProps) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
                <Dialog.Title style={{color: "black"}}>{deck.name}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{color: "black"}}>
                        Are you sure you want to Delete the Deck “{deck.name}” for ever and all Cards in it?!
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel} mode="text" textColor="#6750A4">Cancel</Button>
                    <Button onPress={() => onConfirm()} mode="text" textColor="#6750A4">Confirm</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 8,
        backgroundColor: "#ECE6F0"
    }
});

export default DeleteDeckDialog;