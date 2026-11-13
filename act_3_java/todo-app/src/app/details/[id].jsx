// Actividad realizada por Francisco Manuel Alarcon Rodas
import { ThemeContext } from "@/context/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../../../hooks/useTodos";

export default function Details() {
  const { id } = useLocalSearchParams();
  const { theme } = useContext(ThemeContext);
  const { todos } = useTodos();
  const todo = todos.find((t) => t.id === Number(id));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background, padding: 10 }}>
      <Text style={{ color: theme.text, fontSize: 18 }}>
        {todo ? todo.title : id}
      </Text>
    </SafeAreaView>
  );
}
