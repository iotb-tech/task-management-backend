const taskService = require("../services/task.service");

const createTask = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user.id,
    };
    const task = await taskService.createTask(taskData);
    res.status(201).json({ response: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({ response: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ response: task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskByUserId = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUserId(req.params.id);
    res.status(200).json({ response: tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ response: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const updated = await taskService.updateTaskStatus(
      req.params.id,
      req.body.status
    );
    if (!updated) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ response: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deleted = await taskService.deleteTask(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ response: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const deleted = await taskService.deleteAllTasks();
    res.status(200).json({ response: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTasksByUserId = async (req, res) => {
  try {
    const deleted = await taskService.deleteTasksByUserId(req.params.id);
    res.status(200).json({ response: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  updateTask,
  updateTaskStatus,
  deleteTask,
  deleteAllTasks,
  deleteTasksByUserId,
};
