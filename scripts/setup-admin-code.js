const admin = require("firebase-admin");
const crypto = require("crypto");

const serviceAccount = require("../pasaherotestdrive-firebase-adminsdk-36p17-0fbd872d33.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const adminCode = "pasaHEROBusiness7"; // Replace with your chosen admin code

function hashAdminCode(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

async function updateAdminCode() {
  const hashedCode = hashAdminCode(adminCode);
  await db.collection("app_settings").doc("admin_settings").set(
    {
      hashedAdminCode: hashedCode,
    },
    { merge: true }
  );
  console.log("Admin code updated successfully");
}

updateAdminCode()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error updating admin code:", error);
    process.exit(1);
  });
