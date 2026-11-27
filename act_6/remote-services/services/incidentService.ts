import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export interface Incident {
  id?: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  category: string;
  location: string;
  inspectorId: string;
  inspectorEmail: string;
  createdAt?: any;
}

export const createIncident = async (data: Incident) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Unauthenticated user cannot create incidents");

  console.log("Submitting the request...");

  return await addDoc(collection(db, "incidents"), {
    ...data,
    inspectorId: user.uid,
    createdAt: serverTimestamp(),
  });
};

export const subscribeIncidents = (
  onUpdate: (incidents: Incident[]) => void,
) => {
  const q = query(collection(db, "incidents"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const list: Incident[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Incident, "id">),
    }));
    onUpdate(list);
  });
};
