"use server";
import User from "../models/user.model";
import { connectToDatabase } from "../mongoose";

export async function updateUsere(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<void> {
  connectToDatabase();

  await User.findOneAndUpdate(
    { id: userId },
    { username: username.toLowerCase() }
  );
}
