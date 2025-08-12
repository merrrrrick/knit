"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";
import Knit from "../models/knit.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDatabase();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDatabase();

    return await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDatabase();

    const knits = await User.findOne({ id: userId }).populate({
      path: "knits",
      model: Knit,
      populate: {
        path: "children",
        model: Knit,
        populate: { path: "author", model: User, select: "name image id" },
      },
    });
    return knits;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDatabase();

    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };
    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);
    const users = await userQuery.exec();
    const isNext = totalUsersCount > skipAmount + users.length;
    return {
      users,
      isNext,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDatabase();

    const userKnits = await Knit.find({ author: userId });

    const childKnitIds = userKnits.reduce((acc, userKnit) => {
      return acc.concat(userKnit.children);
    }, []);

    const replies = await Knit.find({
      _id: { $in: childKnitIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image id",
    });

    return replies;
  } catch (error: any) {
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}
