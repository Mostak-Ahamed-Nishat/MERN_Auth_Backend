import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["superadmin", "admin", "salesman"],
    default: "salesman",
  },
  verificationToken: {
    type: String,
    default: () => Date.now() + 5 * 60 * 1000,
  },
  verificationExpired: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

//Create hash password before save to the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare hashed password during login
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//User model
const User = mongoose.model("User", userSchema);

export default User;
