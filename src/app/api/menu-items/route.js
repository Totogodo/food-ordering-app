import { MenuItem } from "@/models/Menu-Items";
import mongoose from "mongoose";
import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";

// let admin = await isAdmin();

export async function POST(req) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);

  return Response.json(true);
}

export async function GET() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  if (await isAdmin()) {
    return Response.json(await MenuItem.find());
  } else {
    return Response.json({});
  }
}

export async function DELETE(req) {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  await MenuItem.deleteOne({ _id });

  return Response.json(true);
}
