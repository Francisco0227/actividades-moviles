import {auth} from "../../firebaseConfig";
import {router, Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {onAuthStateChanged, User} from "firebase/auth";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout(){
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
      setUser(currentUser);
      setIsReady(true);
      SplashScreen.hideAsync();

      if (currentUser){
        router.replace("/(app)");
      } else {
        router.replace("/(auth)/login");
      }
    });

    return () => unsubscribe();
  }, []);
  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: false}}>
      </Stack>
    </SafeAreaProvider>
  )
}


