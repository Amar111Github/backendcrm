const express = require("express");
const {
  FindAllTask,
  CreateTask,
  UpdateTaskAdminEmployee,
  UpdateTaskAdminManager,
  CreateTaskEmployee,
  findTask
} = require("../controllers/taskController");
const { upload, checkFileSize } = require("../middleware/multer");
const {verifyAdminHRManager,verifyAdmin,verifyAll} = require('../middleware/rbacMiddleware');

const taskRoute = express.Router();

taskRoute.get("/tasks",FindAllTask);
// taskRoute.get("/getTask", findTask);
taskRoute.post("/tasks", checkFileSize,upload.single("file"), CreateTask); // create task  in admin
taskRoute.post("/tasks/:taskId/employees", CreateTaskEmployee); //
taskRoute.put("/tasks/:taskId",UpdateTaskAdminManager); // update tsk admin and Manager
taskRoute.put("/tasks/:taskId/employees/:empEmail",UpdateTaskAdminEmployee);

module.exports = { taskRoute };
