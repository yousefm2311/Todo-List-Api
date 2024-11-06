const express = require("express");
const {
  createTask,
  getAllTasks,
  getTasksById,
  updateTask,
  deleteTask,
} = require("../services/taskServices");
const router = express.Router();

router.route("/").post(createTask).get(getAllTasks);
router.route("/:id").get(getTasksById).put(updateTask).delete(deleteTask);
module.exports = router;
