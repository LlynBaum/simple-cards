import {useState} from "react";
import {Button, Dialog, Paragraph, Portal, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";

interface NewDeckDialogProps {
    visible: boolean;
    onConfirm: (name: string) => void;
    onCancel: () => void;
}

const NewDeckDialog = ({visible, onCancel, onConfirm} : NewDeckDialogProps) => {
    const [name, setName] = useState("");

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCancel} style={styles.dialog}>
                <Dialog.Title style={{color: "black"}}>Create Deck</Dialog.Title>
                <Dialog.Content>
                    <Paragraph style={{color: "black"}}>Give the new Deck a name!</Paragraph>
                    <TextInput
                        onChangeText={setName}
                        cursorColor="black"
                        outlineColor="black"
                        activeOutlineColor="black"
                        placeholderTextColor="gray"
                        textColor="black"
                        mode="outlined"
                        style={styles.input}
                        autoFocus
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onCancel} mode="text" textColor="#6750A4">Cancel</Button>
                    <Button onPress={() => onConfirm(name)} mode="text" textColor="#6750A4">Confirm</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


const styles = StyleSheet.create({
    dialog: {
        borderRadius: 8,
        backgroundColor: "#ECE6F0",
    },
    input: {
        marginTop: 10,
        backgroundColor: "transparent",
    },
});

export default NewDeckDialog;