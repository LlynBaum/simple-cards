import {Card} from "@/constants/Types";
import {Button, Dialog, Paragraph, Portal} from "react-native-paper";
import {StyleSheet} from "react-native";

interface DeleteCardDialogProps {
    visible: boolean;
    card: Card;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteCardDialog = ({visible, card, onConfirm, onCancel}: DeleteCardDialogProps) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
                <Dialog.Title style={{color: "black"}}>Delete?</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{color: "black"}}>Are you sure you want to Delete the Card “{card.front}” for ever?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel} mode="text" textColor="#6750A4">Cancel</Button>
                    <Button onPress={() => onConfirm()} mode="text" textColor="#6750A4">Confirm</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 8,
        backgroundColor: "#ECE6F0",
    }
});

export default DeleteCardDialog;