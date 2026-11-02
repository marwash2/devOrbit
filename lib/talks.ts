import connectDB from "@/lib/mongodb";
import TalkModel from "@/models/Talk";
import type { Talk } from "@/data/talks";

export async function getAllTalks(): Promise<Talk[]> {
  await connectDB();

  const talks = await TalkModel.find({})
    .select(
      "slug title description speaker category duration level content -_id",
    )
    .sort({ createdAt: -1 })
    .lean();

  return talks as Talk[];
}

export async function getTalkBySlugFromDB(slug: string): Promise<Talk | null> {
  await connectDB();

  const talk = await TalkModel.findOne({ slug })
    .select(
      "slug title description speaker category duration level content -_id",
    )
    .lean();

  return talk as Talk | null;
}
