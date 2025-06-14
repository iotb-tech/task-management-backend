const Task = require("../models/Task");

const createTask = async (taskData) => {
  try {
    const task = await Task.create(taskData);
    return task;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const getAllTasks = async () => {
  try {
    return await Task.find();
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    console.error(`Error getting task by ID (${id}):`, error);
    throw error;
  }
};

const getTasksByUserId = async (userId) => {
  try {
    return await Task.find({ createdBy: userId });
  } catch (error) {
    console.error(`Error getting tasks by user ID (${userId}):`, error);
    throw error;
  }
};

const updateTask = async (id, updateData) => {
  try {
    return await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error(`Error updating task (${id}):`, error);
    throw error;
  }
};

const updateTaskStatus = async (id, status) => {
  try {
    return await Task.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (error) {
    console.error(`Error updating status for task (${id}):`, error);
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    return await Task.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting task (${id}):`, error);
    throw error;
  }
};

const deleteAllTasks = async () => {
  try {
    return await Task.deleteMany(); // deletes all tasks
  } catch (error) {
    console.error("Error deleting all tasks:", error);
    throw error;
  }
};

const deleteTasksByUserId = async (userId) => {
  try {
    return await Task.deleteMany({ createdBy: userId });
  } catch (error) {
    console.error(`Error deleting tasks by user ID (${userId}):`, error);
    throw error;
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
  updateTaskStatus,
  deleteTask,
  deleteAllTasks,
  deleteTasksByUserId,
};
