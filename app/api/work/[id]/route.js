import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    // Connect to database
    await connectToDB();

    const work = await Work.findById(params.id).populate("creator");
    if (!work) {
      return new Response("work not found", { status: 404 });
    }
    return new Response(JSON.stringify(work), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("failed to get work", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
      if (photo instanceof Object) {
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
      } else {
        // if photo already exists
        workPhotoPaths.push(photo);
      }
    }
    // find existing work
    const existingWork = await Work.findById(params.id);
    if (!existingWork) {
      return new Response("work not found", { status: 404 });
    }
    // update work with new data
    existingWork.creator = creator;
    existingWork.category = category;
    existingWork.title = title;
    existingWork.description = description;
    existingWork.price = price;
    existingWork.workPhotoPaths = workPhotoPaths;

    await existingWork.save();
    return new Response("Successfully updated the work", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("failed to update work", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const work = await Work.findByIdAndDelete(params.id);
    return new Response("Successfully deleted the work", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("failed to delete work", { status: 500 });
  }
};
