const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    status: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deadline: { type: Date },  // Add the deadline field here
  },
  { timestamps: true }  // This will handle the createdAt and updatedAt fields automatically
);



module.exports = mongoose.model("Task", taskSchema);
