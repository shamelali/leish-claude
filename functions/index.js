const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

exports.createPayment = onCall(async (request) => {
    const { detail, amount, orderId } = request.data;
    const secretKey = "SK-RxBtaKSu3dZKrauH8rha"; 
    const hashString = secretKey + detail + amount + orderId;
    const hash = crypto.createHash("sha256").update(hashString).digest("hex");
    return { hash: hash };
});
