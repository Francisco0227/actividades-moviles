import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const input_elements = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <Text>E-mail</Text>
      <TextInput
        placeholder="sample@gmail.com"
        placeholderTextColor={"grey"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Press here" onPress={() => alert("Button presse")} />
    </View>
  );
};

export default input_elements;
