import connectDB from "@/lib/mongodb";
import Talk from "@/models/Talk";

export async function GET() {
  try {
    await connectDB();

    const talks = await Talk.find().sort({ createdAt: -1 }).lean();

    return Response.json(talks);
  } catch (error) {
    console.error("Failed to fetch talks:", error);

    return Response.json({ error: "Unable to fetch talks" }, { status: 500 });
  }
}
