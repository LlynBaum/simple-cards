import {Card} from "@/constants/Types";
import {Card as PaperCard, IconButton} from "react-native-paper";
import {View, Text, StyleSheet} from "react-native";

const CardView = ({card}: {card: Card}) => {
    return (
        <PaperCard style={{backgroundColor: "#FEF7FF", width: "80%", alignSelf: "center"}}>
            <PaperCard.Content
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text>{card.front}</Text>
                <View style={{flexDirection: "row"}}>
                    <IconButton icon="pencil" iconColor="black" style={styles.icon} onPress={() => {}}/>
                    <IconButton icon="delete" iconColor="black" style={styles.icon} onPress={() => {}}/>
                </View>
            </PaperCard.Content>
        </PaperCard>
    )
}

const styles = StyleSheet.create({
    icon: {
        borderWidth: 0,
        backgroundColor: "transparent",
    }
})

export default CardView;