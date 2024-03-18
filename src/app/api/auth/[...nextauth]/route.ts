import mongoose from "mongoose";
import NextAuth from "next-auth";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

const argon2 = require("argon2");

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
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
});
export { handler as GET, handler as POST };
