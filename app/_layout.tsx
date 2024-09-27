import {Stack} from "expo-router";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {ClerkProvider} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import {SupabaseProvider} from "@/context/SupabaseContext";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (error) {
            console.error('Failed to fetch the auth token', error);
            return null;
        }
    },
    async saveToken(key: string, token: string) {
        try {
            return SecureStore.setItemAsync(key, token);
        } catch (error) {
            console.error('Failed to save the auth token', error);
            return null;
        }
    }
};

const InitialLayout = () => {
    return (
        <SupabaseProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
            </Stack>
        </SupabaseProvider>
    );
}

const RootLayout = () => {
    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <StatusBar style="light"/>
            <ActionSheetProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <InitialLayout/>
                </GestureHandlerRootView>
            </ActionSheetProvider>
        </ClerkProvider>
    )
};

export default RootLayout;