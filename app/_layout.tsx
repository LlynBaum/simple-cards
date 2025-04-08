import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {PaperProvider} from "react-native-paper";

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="deck/[id]" />
                <Stack.Screen name="card/[id]" options={{headerShown: false}} />
                <Stack.Screen name="card/new" options={{headerShown: false}}/>
                <Stack.Screen name="study/[id]" options={{headerShown: false}}/>
            </Stack>
            <StatusBar style="auto"/>
        </PaperProvider>
    );
}
