import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const id = data._id;

  let filter = {};
  if (id) {
    filter = id;
    await User.findByIdAndUpdate(filter, data);
    return Response.json(true);
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    filter = { email };
  }
  console.log(data);
  await User.updateOne(filter, data);
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return Response.json(await User.findOne({ email }));
}
