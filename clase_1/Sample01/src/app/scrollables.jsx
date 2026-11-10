import { FlatList, Image, ScrollView, Text, View } from "react-native";

const scrollables = () => {
  const usersList = [
    { id: "1", name: "Alice", image: "https://picsum.photos/200/400?random=1" },
    { id: "2", name: "Bob", image: "https://picsum.photos/200/400?random=2" },
    {
      id: "3",
      name: "Charlie",
      image: "https://picsum.photos/200/400?random=3",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>Section 1</Text>
        <Text>Section 2</Text>
      </ScrollView>

      <FlatList
        data={usersList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Image
              source={{ url: item.image }}
              style={{ width: 200, height: 400 }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default scrollables;
