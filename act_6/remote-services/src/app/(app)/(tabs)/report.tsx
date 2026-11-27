import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../../../../firebaseConfig";
import { createIncident } from "../../../../services/incidentService";

export default function ReportScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Network Security");
  const [severity, setSeverity] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >("MEDIUM");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !location || !description)
      return Alert.alert("Error", "Please fill all required fields.");
    try {
      await createIncident({
        title,
        category,
        severity,
        location,
        description,
        inspectorId: auth.currentUser?.uid || "anon",
        inspectorEmail: auth.currentUser?.email || "unknown",
      });
      Alert.alert("Success", "Incident recorded in Cloud Firestore!");
      router.push("/(app)");
    } catch (err: any) {
      console.log(err);
      Alert.alert("Submission Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Incident Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title..."
        placeholderTextColor="#64748b"
      />
      <Text style={styles.label}>Location / Facility</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location..."
        placeholderTextColor="#64748b"
      />
      <Text style={styles.label}>Severity Level</Text>
      <View>
        {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((level) => (
          <Pressable
            key={level}
            onPress={() => setSeverity(level)}
            style={[styles.chip, severity === level && styles.activeChip]}
          >
            <Text style={styles.chipText}>{level}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Detailed Description</Text>
      <TextInput
        style={[styles.input]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        placeholder="Notes..."
        placeholderTextColor="#64748b"
      />
      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit Incident Report</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f19", padding: 16 },
  label: {
    color: "#cbd5e1",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
  },
  imageBtn: {
    backgroundColor: "#334155",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  preview: { width: "100%", height: 120, borderRadius: 8, marginTop: 10 },
  submitBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  chipText: { color: "#fff", fontWeight: "bold" },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 12,
  },
  chip: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  activeChip: { backgroundColor: "#0284c7", borderColor: "#38bdf8" },
  activeChipText: { color: "#ffffff" },
});
