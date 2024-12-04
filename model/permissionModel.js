import mongoose from "mongoose";
import Role from "./roleModel.js";

const permissionSchema = mongoose.Schema({
  permissionName: {
    type: String,
    require: true,
    unique: true,
  }, // e.g., 'manageUsers', 'viewReports'
  role: [
    {
      role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
      action: [{ type: String, enum: ["view", "edit", "update", "delete"] }],
    },
  ],
});

const Permission = permissionSchema.model("Permission", permissionSchema);
export default Permission;
