import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { category } = params;
    let workList;

    if (category != "All") {
      workList = await Work.find({ category }).populate("creator");
    } else {
      workList = await Work.find().populate("creator");
    }

    return new Response(JSON.stringify(workList), { status: 200 });
  } catch (err) {
    return new Response("failed to fetch work list", { status: 500 });
  }
};
