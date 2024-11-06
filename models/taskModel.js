const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a task title"],
      minlength: [3, "Too short task title"],
      maxlength: [32, "Too long task title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      default: "active",
    },

    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      default: "medium",
    },
    recurring: {
      type: String,
      default: "none",
    },
    comment: {
      type: String,
      trim: true,
      default: "No comment provided",
    },
    feedback: {
      type: String,
      trim: true,
      default: "No feedback provided",
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: String,
    description: {
      type: String,
      minlength: [10, "Too short description"],
      maxlength: [500, "Too long description"],
      trim: true,
      default: "No description provided",
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("TodoList", taskSchema);

module.exports = TaskModel;
