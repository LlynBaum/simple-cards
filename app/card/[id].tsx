import {useFocusEffect, useLocalSearchParams, useRouter} from "expo-router";
import {useCallback, useState} from "react";
import {Card} from "@/constants/Types";
import Loading from "@/components/Loading";
import {StyleSheet, View} from "react-native";
import {Button, TextInput} from "react-native-paper";

const EditCard = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams<{ id: string }>();

    const [card, setCard] = useState<Card>({} as Card);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useFocusEffect(useCallback(() => {
        setIsLoading(true);
        fetch(`https://flashcard.darki.dev/api/cards?id=${id}`)
            .then(res => {
                if (!res.ok) {
                    alert("There was a problem while loading the Card!");
                    return {} as Card;
                }
                return res.json()
            })
            .then(card => setCard(card))
            .then(() => setIsLoading(false));
    }, [id]));

    const onChangeFront = useCallback((text: string) => {
        setCard(prev => ({...prev, front: text} as Card));
    }, []);

    const onChangeBack = useCallback((text: string) => {
        setCard(prev => ({...prev, back: text} as Card));
    }, []);

    const onSave = () => {
        setIsLoading(true);
        fetch("https://flashcard.darki.dev/api/cards", {
            method: "PUT",
            body: JSON.stringify(card)
        })
            .then(res => {
                setIsLoading(false);
                if(res.ok){
                    router.back();
                }
                else {
                    alert("There was a problem while saving the Card!");
                }
            })
            .catch(e => {
                setIsLoading(false);
                alert("There was a problem while saving the Card!");
                console.error(e);
            });
    }

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                       defaultValue={card.front}
                       placeholder="Term"
                       mode="outlined"
                       textColor="black"
                       cursorColor="black"
                       outlineColor="black"
                       activeOutlineColor="black"
                       placeholderTextColor="gray"
                       onChangeText={onChangeFront}/>

            <TextInput style={styles.input}
                       defaultValue={card.back}
                       placeholder="Definition"
                       mode="outlined"
                       textColor="black"
                       cursorColor="black"
                       outlineColor="black"
                       activeOutlineColor="black"
                       placeholderTextColor="gray"
                       onChangeText={onChangeBack}/>
            <View style={styles.buttons}>
                <Button mode="contained" onPress={() => router.back()}>Cancel</Button>
                <Button mode="contained" onPress={onSave}>Save</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        padding: 10
    },
    input: {
        width: "80%",
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 5,
        marginBottom: 10
    }
});

export default EditCard;