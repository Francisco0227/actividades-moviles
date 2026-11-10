import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello</Text>
      {/* Pushes the local detail file onto this tab's stack */}
      <Button title="Press me" onPress={() => router.push('/profile/detail')} />
    </View>
  );
}
