const { Schema, models, model } = require("mongoose");
const argon2 = require("argon2");

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 5) {
          new Error("Password must be at least 5 characters");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", async function (user) {
  try {
    const notHashedPasword = user.password;
    user.password = await argon2.hash(notHashedPasword);
  } catch (err) {
    console.error(err);
  }
});

//TODO verify when login in
// async function verifyPassword(hash, password) {
//   try {
//     if (await argon2.verify(hash, password)) {
//       // Hasło jest poprawne
//     } else {
//       // Niepoprawne hasło
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

export const User = models?.User || model("User", UserSchema);
