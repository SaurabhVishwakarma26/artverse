import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const work = await Work.findById(params.id).populate("creator");

    if (!work) {
      return new Response("The work not found", { status: 404 });
    }

    return new Response(JSON.stringify(work), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    /*extract info from the data*/
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");

    /*Get an array of uploaded photos*/
    const photos = data.getAll("workPhotoPaths");

    const workPhotoPaths = [];

    /*Process and store each photo*/
    for (const photo of photos) {
      if (photo instanceof Object) {
        /*Read the photo as an array buffer*/
        const bytes = await photo.arrayBuffer();

        /*Convert it to buffer*/
        const buffer = Buffer.from(bytes);

        /*Define the destination path for the uploaded file*/
        const workImagePath = `H:/imageverse/public/uploads/${photo.name}`;

        /*Write the buffer to the file system*/
        await writeFile(workImagePath, buffer);

        /*Store the file path in an array*/
        workPhotoPaths.push(`/uploads/${photo.name}`);
      } else {
        //if it's an old photo
        workPhotoPaths.push(photo);
      }
    }

    /*Find the existing work*/
    const existingWork = await Work.findById(params.id);
    if (!existingWork) {
      return new Response("The work not found", { status: 404 });
    }

    /*update the Work with new data*/
    existingWork.category = category;
    existingWork.title = title;
    existingWork.description = description;
    existingWork.price = price;
    existingWork.workPhotoPaths = workPhotoPaths;

    await existingWork.save();

    return new Response("Successfully updated the work", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error updating the work", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Work.findByIdAndDelete(params.id);

    return new Response("Successfully deleted the work", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting the work", { status: 500 });
  }
};
