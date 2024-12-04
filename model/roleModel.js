import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
