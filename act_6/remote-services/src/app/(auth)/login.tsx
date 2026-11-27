import * as WebBrowser from "expo-web-browser";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please complete email and password.");
      return;
    }
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        Alert.alert("Success", "Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: any) {
      Alert.alert("Auth Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INCIDENT VAULT</Text>
      <Text style={styles.sub}>TC2007B Field Inspector Portal</Text>

      <TextInput
        style={styles.input}
        placeholder="Inspector Email"
        placeholderTextColor="#64748b"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748b"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#38bdf8"
          style={{ marginVertical: 12 }}
        />
      ) : (
        <>
          <Pressable style={styles.btnPrimary} onPress={handleEmailAuth}>
            <Text style={styles.btnText}>
              {isRegistering ? "Create Email Account" : "Sign In with Email"}
            </Text>
          </Pressable>
        </>
      )}

      <Pressable
        onPress={() => setIsRegistering(!isRegistering)}
        style={{ marginTop: 16 }}
      >
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already registered? Sign In"
            : "Don't have an account? Register"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f19",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#38bdf8",
    textAlign: "center",
  },
  sub: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnPrimary: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: "#334155" },
  dividerText: {
    color: "#64748b",
    marginHorizontal: 10,
    fontSize: 11,
    fontWeight: "bold",
  },
  btnGoogle: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.5 },
  btnGoogleText: { color: "#0f172a", fontWeight: "bold", fontSize: 14 },
  btnText: { color: "#fff", fontWeight: "bold" },
  switchText: { color: "#94a3b8", textAlign: "center", fontSize: 12 },
});
