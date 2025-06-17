const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { verifyAccessToken } = require("../helpers/token.helpers");

router.post("/create", verifyAccessToken, taskController.createTask);
router.get("/getAll", verifyAccessToken, taskController.getAllTasks);
router.get("/getById/:id", verifyAccessToken, taskController.getTaskById);
router.get(
  "/getByUserId/:id",
  verifyAccessToken,
  taskController.getTaskByUserId
);
router.put("/update/:id", verifyAccessToken, taskController.updateTask);
router.put(
  "/updateStatus/:id",
  verifyAccessToken,
  taskController.updateTaskStatus
);
router.delete("/delete/:id", verifyAccessToken, taskController.deleteTask);
router.delete("/deleteAll", verifyAccessToken, taskController.deleteAllTasks);
router.delete(
  "/deleteByUser/:id",
  verifyAccessToken,
  taskController.deleteTasksByUserId
);

module.exports = router;
