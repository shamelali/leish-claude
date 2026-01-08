const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Initialize Admin SDK once at the top.
// If running locally you can set SERVICE_ACCOUNT_PATH env var to a
// service account JSON file path. In production (Cloud Functions)
// the default credentials will be used and you should NOT provide
// a service account file.
let adminInitialized = false;
if (process.env.SERVICE_ACCOUNT_PATH) {
    const svcPath = path.resolve(process.env.SERVICE_ACCOUNT_PATH);
    if (fs.existsSync(svcPath)) {
        // Do not commit service account JSON to source control.
        const serviceAccount = require(svcPath);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        adminInitialized = true;
    }
}
if (!adminInitialized) {
    admin.initializeApp();
}

/**
 * checkAdmin function
 * Checks if the authenticated user has the "admin" custom claim.
 */
exports.checkAdmin = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        const err = new functions.https.HttpsError(
            "unauthenticated",
            "The function must be called while authenticated.",
        );
        throw err;
    }

    const uid = context.auth.uid;
    const user = await admin.auth().getUser(uid);

    return { isAdmin: !!(user.customClaims && user.customClaims.admin) };
});

/**
 * getSenangPayHash
 * Dynamically generates a hash for senangPay transactions.
 */
exports.getSenangPayHash = functions.https.onCall((data, context) => {
    const secretKey = "SK-RxBtaKSu3dZKrauH8rha";
    const defaultDetail =
        "Station A - Makeup Station A, Station B - Makeup station B, " +
        "Studio - Studio setup with equipment ready";
    const detail = data.detail || defaultDetail;
    const amount = data.amount || "200.00";
    const orderId = data.orderId || "2601070001";

    const hashString = secretKey + detail + amount + orderId;

    const sha256Hash = crypto
        .createHmac("sha256", secretKey)
        .update(hashString)
        .digest("hex");
    const md5Hash = crypto
        .createHash("md5")
        .update(hashString)
        .digest("hex");

    return {
        orderId,
        sha256Hash,
        md5Hash,
    };
});

// Import existing modules if they exist in your directory
// const sendBookingEmail = require("./sendBookingEmail");
// const stripeWebhook = require("./stripeWebhook");
// exports.sendBookingEmail = functions.https.onCall(sendBookingEmail);
// exports.stripeWebhook = functions.https.onRequest(stripeWebhook);