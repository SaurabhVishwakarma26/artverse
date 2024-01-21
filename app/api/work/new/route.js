import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    // Connect to database
    await connectToDB();

    const data = await req.formData();
    console.log("data in api", data);

    // Take info from the form
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");

    //get an array of uploaded phtotos
    const photos = data.getAll("workPhotoPaths");

    const workPhotoPaths = [];

    //process and store phtots
    for (const photo of photos) {
      //read the photo as array buffer
      const bytes = await photo.arrayBuffer();

      //conver it to buffer
      const buffer = Buffer.from(bytes);

      //define the destination file path for uploaded file
      const workImagePath = `${process.env.ARTVERSE_PATH}/public/uploads/${photo.name}`;

      // write the buffer to file system
      await writeFile(workImagePath, buffer);

      // store the file in path array
      workPhotoPaths.push(`/uploads/${photo.name}`);
    }

    //create a new work
    const newWork = new Work({
      creator,
      category,
      title,
      description,
      price,
      workPhotoPaths,
    });

    await newWork.save();
    return new Response(JSON.stringify(newWork), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("failed to create new work", { status: 500 });
  }
}
