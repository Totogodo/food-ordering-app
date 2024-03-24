import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  console.log("🚀 ~ GET ~ userEmail:", userEmail);
  const admin = await isAdmin();
  console.log("🚀 ~ GET ~ admin:", admin);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  console.log("🚀 ~ GET ~ _id:", _id);
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (admin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ email: userEmail }));
  }
}
