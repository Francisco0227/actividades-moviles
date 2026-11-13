// Actividad realizada por Francisco Manuel Alarcon Rodas
import { ThemeContext } from "@/context/ThemeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TodoItem } from "../../components/TodoItem";
import { useTodos } from "../../hooks/useTodos";

export default function Index() {
  const [text, setText] = useState("");
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const router = useRouter();

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme, colorScheme); //TBD

  const handlePress = (id) => {
    router.push(`/details/${id}`);
  };

  const handleAddTodo = () => {
    if (addTodo(text)) {
      setText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text here"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
        >
          {colorScheme === "light" ? (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={24}
              color={theme.text}
              style={styles.icon}
            />
          ) : (
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={24}
              color={theme.text}
              style={styles.icon}
            />
          )}
        </Pressable>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onDetails={handlePress}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background, //theme.background
    },
    inputContainer: {
      flexDirection: "row",
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      minWidth: 0,
      borderColor: theme.text,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.button, //theme.button
      borderRadius: 5,
      padding: 10,
    },
    buttonText: {
      color: theme.text, //theme.text
      fontSize: 18,
    },
    themeicon: {
      color: "theme.themeicon",
    },
  });
}
