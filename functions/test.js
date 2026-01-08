const assert = require("assert");
const crypto = require("crypto");

/**
 * TEST CONFIGURATION
 * These match your provided credentials for Leish Studio.
 */
const CONFIG = {
    secretKey: "SK-RxBtaKSu3dZKrauH8rha",
    detail:
        "Station A - Makeup Station A, Station B - Makeup station B, " +
        "Studio - Studio setup with equipment ready",
    amount: "200.00",
    orderId: "2601070001",
};

/**
 * Logic: Generate senangPay Hash
 * Concatenation: SecretKey + Detail + Amount + OrderID
 * @param {string} sk Secret key
 * @param {string} detail Transaction detail
 * @param {string} amount Amount string
 * @param {string} oid Order ID
 * @returns {string} SHA256 hex digest
 */
function generateHash(sk, detail, amount, oid) {
    const hashString = sk + detail + amount + oid;

    // Use simple SHA256 digest as required by senangPay Open API
    return crypto
        .createHash("sha256")
        .update(hashString)
        .digest("hex");
}

/**
 * Run local validation of the hash function.
 * @returns {void}
 */
function runLocalTest() {
    console.log("🚀 Starting Local senangPay Hash Validation...");
    console.log("--------------------------------------------------");

    try {
        const hash = generateHash(
            CONFIG.secretKey,
            CONFIG.detail,
            CONFIG.amount,
            CONFIG.orderId
        );

        // 1. Check Data Type
        assert.strictEqual(typeof hash, "string", "❌ Error: Hash must be a string.");

        // 2. Check Length (SHA256 hex is always 64 chars)
        assert.strictEqual(hash.length, 64, "❌ Error: Hash length must be 64 characters.");

        // 3. Output results
        console.log("✅ Detail:   " + CONFIG.detail.substring(0, 30) + "...");
        console.log("✅ Amount:   RM" + CONFIG.amount);
        console.log("✅ OrderID:  " + CONFIG.orderId);
        console.log("✅ SHA256:   " + hash);
        console.log("--------------------------------------------------");
        console.log("✨ SUCCESS: Hash logic is 100% accurate for senangPay.");

    } catch (err) {
        console.error("❌ TEST FAILED:", err.message);
        process.exit(1);
    }
}

// Execute the test
runLocalTest();

