"use server";

import { revalidatePath } from "next/cache";
import Knit from "../models/knit.model";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createKnit({ text, author, communityId, path }: Params) {
  try {
    connectToDatabase();

    const createKnit = await Knit.create({ text, author, community: null });

    await User.findByIdAndUpdate(author, {
      $push: { knit: createKnit._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create knit: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 1) {
  connectToDatabase();
  const skipAmount = (pageNumber - 1) * pageSize;

  const postsQuery = await Knit.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });
    const totalPostsCount = await Knit.countDocuments({ parentId: { $in: [null, undefined] }})
    const posts = postsQuery;
    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext }
}
