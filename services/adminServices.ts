import { db } from "../utils/firebaseConfig";
import {
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

export const subscribeToAdminStats = (callback: (stats: any) => void) => {
  const statsRef = collection(db, "adminStats");

  return onSnapshot(statsRef, (snapshot: QuerySnapshot<DocumentData>) => {
    const stats = snapshot.docs[0]?.data() || {
      totalUsers: 0,
      newSignups: 0,
      activeUsers: 0,
      applicants: 0,
    };
    callback(stats);
  });
};

export const subscribeToApplicants = (
  callback: (applicants: any[]) => void
) => {
  const applicantsRef = collection(db, "applicants");

  return onSnapshot(applicantsRef, (snapshot: QuerySnapshot<DocumentData>) => {
    const applicants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(applicants);
  });
};

export const getApplicantDetails = async (applicantId: string) => {
  const applicantRef = doc(db, "applicants", applicantId);
  const applicantSnap = await getDoc(applicantRef);

  if (applicantSnap.exists()) {
    return { id: applicantSnap.id, ...applicantSnap.data() };
  } else {
    throw new Error("Applicant not found");
  }
};

export const approveApplicant = async (applicantId: string) => {
  const applicantRef = doc(db, "applicants", applicantId);
  await updateDoc(applicantRef, {
    status: "approved",
    approvedAt: new Date(),
  });

  // Here you might want to move the applicant to a "users" collection
  // or update their status in the "users" collection if they already exist
};

export const rejectApplicant = async (applicantId: string) => {
  const applicantRef = doc(db, "applicants", applicantId);
  await updateDoc(applicantRef, {
    status: "rejected",
    rejectedAt: new Date(),
  });

  // Optionally, you could delete the applicant instead of updating
  // await deleteDoc(applicantRef);
};
