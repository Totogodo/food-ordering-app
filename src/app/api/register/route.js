import mongoose from "mongoose";
import { User } from "@/models/User";

const URL =
  "mongodb+srv://mzaiarnyi:7lwS4VNpC0G3bfIZ@cluster0.g8anloh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("Password must be at least 5 characters");
  } else {
    try {
      const notHashedPasword = pass;
      body.password = argon2.hash(notHashedPasword);
    } catch (err) {
      console.error("Herror", err);
    }
  }

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
