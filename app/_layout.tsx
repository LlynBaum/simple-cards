import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {PaperProvider} from "react-native-paper";
import {useEffect} from "react";
import * as Notifications from 'expo-notifications';
import {SchedulableTriggerInputTypes} from 'expo-notifications';
import * as Device from 'expo-device';
import {Platform} from "react-native";


async function scheduleDailyNotification() {
    if(Platform.OS === "android"){
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if(!Device.isDevice) {
        console.warn("Notifications", "notification can't be registered. Must use a physical device!");
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if(existingStatus !== "granted"){
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if(finalStatus !== "granted"){
        console.error("Notifications", "Permission not granted to get push token for push notification!");
        return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    const trigger = new Date();
    trigger.setHours(18);
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Already studied today?",
            body: "Don't forget to study! You can do it!",
        },
        trigger: {
            hour: 15,
            minute: 0,
            type: SchedulableTriggerInputTypes.DAILY
        },
    });
}

export default function RootLayout() {
    useEffect(() => {
        scheduleDailyNotification();
    }, []);

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
