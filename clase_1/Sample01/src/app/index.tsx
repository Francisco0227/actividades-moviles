import { StyleSheet, Text, View } from "react-native";

const MyApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text}>3</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  container1: {
    backgroundColor: "red",
    //flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 300,
  },
  container2: {
    backgroundColor: "bue",
    flex: 1,
    width: 100,
    height: 100,
  },
  container3: {
    backgroundColor: "green",
    flex: 1,
    width: 100,
    height: 100,
  },
  text: {
    color: "#FFFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default MyApp;
