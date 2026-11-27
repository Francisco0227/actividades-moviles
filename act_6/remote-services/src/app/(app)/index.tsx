import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { auth, db } from "../../../firebaseConfig";

interface IncidentDoc {
  id: string;
  title: string;
  severity: string;
  category: string;
  inspectorId: string;
  inspectorEmail: string;
}

export default function FeedScreen() {
  const [incidents, setIncidents] = useState<IncidentDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "incidents"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: IncidentDoc[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<IncidentDoc, "id">),
      }));
      setIncidents(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Incident Vault Feed</Text>
          <Text style={styles.subtitle}>{auth.currentUser?.email}</Text>
        </View>
        <Pressable
          style={styles.reportBtn}
          onPress={() => router.push("/(app)/(tabs)/report")}
        >
          <Text style={styles.reportText}>+ Report</Text>
        </Pressable>
        <Pressable style={styles.signOutBtn} onPress={() => signOut(auth)}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#38bdf8" />
        </View>
      ) : (
        <FlatList
          data={incidents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(app)/details/[id]",
                  params: { id: item.id },
                })
              }
            >
              <View>
                <Text style={styles.cardTitle}>
                  {item.title} ({item.severity})
                </Text>
                <Text style={styles.cardMeta}>
                  Reported by: {item.inspectorEmail}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f19", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 40,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#38bdf8" },
  subtitle: { color: "#64748b", fontSize: 11 },
  signOutBtn: {
    backgroundColor: "#7f1d1d",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  signOutText: { color: "#ef4444", fontWeight: "bold", fontSize: 12 },
  reportBtn: {
    backgroundColor: "#170fe8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  reportText: { color: "#f5f5f9", fontWeight: "bold", fontSize: 12 },
  card: {
    backgroundColor: "#1e293b",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#334155",
  },
  cardTitle: { color: "#fff", fontWeight: "bold" },
  cardMeta: { color: "#64748b", fontSize: 11, marginTop: 4 },
});
