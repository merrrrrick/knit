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
      $push: { knits: createKnit._id },
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
  const totalPostsCount = await Knit.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const posts = postsQuery;
  const isNext = totalPostsCount > skipAmount + posts.length;
  return { posts, isNext };
}

export async function fetchKnitById(id: string) {
  connectToDatabase();

  try {
    const knit = await Knit.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Knit,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return knit;
  } catch (error: any) {
    throw new Error(`Failed to fetch knit: ${error.message}`);
  }
}

export async function addCommentToKnit(
  knitId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDatabase();

  try{
    const originalKnit = await Knit.findById(knitId);
    if(!originalKnit) throw new Error("Knit not found");

    const commentKnit = new Knit({
      text: commentText,
      author: userId,
      parentId: knitId
    })

    const savedcommentKnit = await commentKnit.save();
    originalKnit.children.push(savedcommentKnit._id);
    await originalKnit.save()
    
    revalidatePath(path);
  } catch(error:any){
    throw new Error(`Failed to add comment to knit: ${error.message}`);
  }
}
