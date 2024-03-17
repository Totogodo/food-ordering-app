import mongoose from "mongoose";
import { User } from "@/models/User";
const URL =
  "mongodb+srv://mzaiarnyi:7lwS4VNpC0G3bfIZ@cluster0.g8anloh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//! URL used because process.env.MONGO_URL wont work!
//TODO check why it wont work and fix

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL || URL);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
