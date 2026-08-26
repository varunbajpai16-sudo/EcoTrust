import cron from "node-cron";
import { getActiveFactories, getLatestReadingByFactory } from "../services/cemsClient.service.js";
import { processFactoryReading } from "../services/pipeline.service.js";

export const startCemsPoller = () => {
  console.log("🚀 CEMS Background Poller scheduled (Runs every 1 minute)...");

  // Har 1 minute ('*/1 * * * *')
  cron.schedule("*/1 * * * *", async () => {
    try {
      const factories = await getActiveFactories();
      if (!factories || factories.length === 0) {
        console.log("ℹ️ No active factories found in CEMS Server.");
        return;
      }

      console.log(`📡 Polling telemetry for ${factories.length} factories...`);

      for (const factory of factories) {
        const latestReading = await getLatestReadingByFactory(factory.factoryId);
        if (latestReading) {
          await processFactoryReading(latestReading, factory);
        }
      }
      console.log("✅ Validation cycle completed successfully.");
    } catch (error) {
      console.error("❌ Poller Job Error:", error.message);
    }
  });
};