//HOOK UNA FUNCIÓN QUE REGRESA OTRAS FUNCIONES.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { data } from "../data/todos";

const TODOS_KEY = "@todos_v1";

// Lista por default (la de ahorita). Copia para no mutar `data`.
const defaultTodos = [...data].sort((a, b) => b.id - a.id);

export function useTodos() {
  const [todos, setTodos] = useState(defaultTodos);
  const [loaded, setLoaded] = useState(false);

  // 1) AL ABRIR LA APP: leer de AsyncStorage (getItem)
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
        if (jsonValue !== null) {
          setTodos(JSON.parse(jsonValue));
        }
        // si es null (primera vez), se queda la lista por default
      } catch (error) {
        console.error("Failed to load todos:", error);
        // si falla, se queda la lista por default
      } finally {
        setLoaded(true);
      }
    };
    loadTodos();
  }, []);

  // 2) CADA VEZ QUE CAMBIA todos: guardar en AsyncStorage (setItem)
  useEffect(() => {
    if (!loaded) return; // no guardar antes de terminar de cargar

    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error("Failed to save todos:", error);
      }
    };
    saveTodos();
  }, [todos, loaded]);

  const addTodo = (title) => {
    if (!title.trim()) return false;

    const newId = todos.length > 0 ? todos[0].id + 1 : 1;
    setTodos([{ id: newId, title: title.trim(), completed: false }, ...todos]);
    return true;
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
}
