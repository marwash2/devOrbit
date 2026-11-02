import mongoose from "mongoose";
import connectDB from "../lib/mongodb";
import Talk from "../models/Talk";
import { talks } from "../data/talks";

async function seedTalks() {
  await connectDB();

  try {
    for (const talk of talks) {
      await Talk.updateOne(
        { slug: talk.slug },
        { $set: talk },
        { upsert: true },
      );
    }

    console.log(`Successfully seeded ${talks.length} talks.`);
  } finally {
    await mongoose.disconnect();
  }
}

seedTalks().catch((error) => {
  console.error("Failed to seed talks:", error);
  process.exitCode = 1;
});
