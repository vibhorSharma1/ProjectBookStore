const cron = require("node-cron");
const Discount = require("../models/discount");

// Function jo expired discounts remove kare
async function removeExpiredDiscounts() {
  console.log("🕒 Checking expired discounts...");

  try {
    const today = new Date();

    const result = await Discount.deleteMany({
      validTo: { $lt: today }
    });

    console.log(`✅ ${result.deletedCount} expired discounts removed.`);
  } catch (error) {
    console.error("❌ Error removing expired discounts:", error);
  }
}

// Cron job → har din midnight pe chalega
const discountCleanupJob = cron.schedule("0 0 * * *", removeExpiredDiscounts);

module.exports = { discountCleanupJob, removeExpiredDiscounts };
