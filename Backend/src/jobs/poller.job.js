// import cron from "node-cron";
// import { getActiveFactories, getLatestReadingByFactory } from "../services/cemsClient.service.js";
// import { processFactoryReading } from "../services/pipeline.service.js";

// export const startCemsPoller = () => {
//   console.log("🚀 CEMS Background Poller scheduled (Runs every 1 minute)...");

//   // Har 1 minute ('*/1 * * * *')
//   cron.schedule("*/1 * * * *", async () => {
//     try {
//       const factories = await getActiveFactories();
//       if (!factories || factories.length === 0) {
//         console.log("ℹ️ No active factories found in CEMS Server.");
//         return;
//       }

//       console.log(`📡 Polling telemetry for ${factories.length} factories...`);

//       for (const factory of factories) {
//         const latestReading = await getLatestReadingByFactory(factory.factoryId);
//         if (latestReading) {
//           await processFactoryReading(latestReading, factory);
//         }
//       }
//       console.log("✅ Validation cycle completed successfully.");
//     } catch (error) {
//       console.error("❌ Poller Job Error:", error.message);
//     }
//   });
// };


import cron from "node-cron";
import { getActiveFactories, getLatestReadingByFactory } from "../services/cemsClient.service.js";
import { processFactoryReading } from "../services/pipeline.service.js";

// Reusable Sync Function
export const runValidationCycle = async () => {
  try {
    console.log("📡 Fetching live factories from CEMS Server...");
    const factories = await getActiveFactories();

    if (!factories || factories.length === 0) {
      console.log("ℹ️ No active factories returned by CEMS Server.");
      return;
    }

    console.log(`🏭 Found ${factories.length} factories. Auditing telemetry with AI & Rules...`);

    for (const factory of factories) {
      // Handle both factory.factoryId or factory._id
      const idToFetch = factory.factoryId || factory._id;
      if (!idToFetch) continue;

      const latestReading = await getLatestReadingByFactory(idToFetch);
      if (latestReading) {
        await processFactoryReading(latestReading, factory);
      }
    }
    console.log("✅ EcoTrust Validation cycle completed successfully!");
  } catch (error) {
    console.error("❌ Poller Job Error:", error.message);
  }
};

export const startCemsPoller = () => {
  console.log("🚀 CEMS Background Poller initialized.");

  // 1. Server start hote hi pehli baar turant run karein
  runValidationCycle();

  // 2. Uske baad har 1 minute par automatically run hoga ('*/1 * * * *')
  cron.schedule("*/1 * * * *", () => {
    runValidationCycle();
  });
};