import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let isAdmin = false;

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    return Response.json(await Order.findById(_id));
  }

  if (userEmail) {
    const userInfo = await User.findOne();
    if (userInfo) {
      isAdmin = userInfo.admin;
    }
  }
  console.log("🚀 ~ GET ~ isAdmin:", isAdmin);

  if (isAdmin) {
    return Response.json(await Order.find());
  }

  if (userEmail) {
    return Response.json(await Order.find({ email: userEmail }));
  }
}