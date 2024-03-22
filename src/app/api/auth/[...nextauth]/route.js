const argon2 = require("argon2");
import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });
        const isValid = user && (await argon2.verify(user.password, password));

        if (isValid) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const userInfo = await User.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
