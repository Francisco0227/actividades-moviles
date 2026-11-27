import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../../../firebaseConfig";
import { Incident } from "../../../../services/incidentService";

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "incidents", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setIncident(docSnap.data() as Incident);
        }
      } catch (error) {
        console.error("Error fetching incident details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  if (!incident) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#ef4444" }}>Incident Document Not Found.</Text>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>{incident.severity}</Text>
      <Text style={styles.title}>{incident.title}</Text>
      <Text style={styles.meta}>Category: {incident.category}</Text>
      <Text style={styles.meta}>Location: {incident.location}</Text>

      <View style={styles.box}>
        <Text style={styles.boxLabel}>Audit Findings:</Text>
        <Text style={styles.boxText}>{incident.description}</Text>
      </View>

      <Text style={styles.meta}>Reporter UID: {incident.inspectorId}</Text>
      <Text style={styles.meta}>Reporter Email: {incident.inspectorEmail}</Text>

      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Back to Feed</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f19",
    padding: 16,
    paddingTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0b0f19",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#38bdf8", marginTop: 4 },
  badge: { color: "#4ade80", fontSize: 13, fontWeight: "bold" },
  box: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  boxLabel: { color: "#64748b", fontSize: 12, fontWeight: "bold" },
  boxText: { color: "#f8fafc", fontSize: 14, marginTop: 4 },
  meta: { color: "#94a3b8", fontSize: 12, marginTop: 8 },
  fullImage: { width: "100%", height: 200, borderRadius: 8, marginTop: 8 },
  backBtn: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
