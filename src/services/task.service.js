const Task = require("../models/Task");

const createTask = async (taskData) => {
  try {
    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.category ||
      !taskData.createdBy ||
      !taskData.startTime ||
      !taskData.endTime
    ) {
      return {
        success: false,
        error: true,
        status: 400,
        message: "Missing required fields",
      };
    }

    const taskExists = await Task.findOne({
      title: taskData.title,
      createdBy: taskData.createdBy,
    });
    if (taskExists) {
      return {
        success: false,
        error: true,
        status: 400,
        message: "Task title from this user already exists",
      };
    }

    const task = await Task.create(taskData);
    return {
      success: true,
      error: false,
      status: 201,
      message: "Task created successfully",
      task,
    };
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const getAllTasks = async () => {
  try {
    const tasks = await Task.find();
    return {
      success: true,
      error: false,
      status: 200,
      message: "All tasks retrieved successfully",
      tasks,
    };
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    return {
      success: true,
      error: false,
      status: 200,
      message: "Task retrieved successfully",
      task,
    };
  } catch (error) {
    console.error(`Error getting task by ID (${id}):`, error);
    throw error;
  }
};

const getTasksByUserId = async (userId) => {
  try {
    const tasks = await Task.find({ createdBy: userId });
    return {
      success: true,
      error: false,
      status: 200,
      message: "User tasks retrieved successfully",
      tasks,
    };
  } catch (error) {
    console.error(`Error getting tasks by user ID (${userId}):`, error);
    throw error;
  }
};

const updateTask = async (id, updateData) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return {
      success: true,
      error: false,
      status: 200,
      message: "Task updated successfully",
      updatedTask,
    };
  } catch (error) {
    console.error(`Error updating task (${id}):`, error);
    throw error;
  }
};

const updateTaskStatus = async (id, status) => {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    return {
      success: true,
      error: false,
      status: 200,
      message: "Task status updated successfully",
      task,
    };
  } catch (error) {
    console.error(`Error updating status for task (${id}):`, error);
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    return {
      success: true,
      error: false,
      status: 200,
      message: "Task deleted successfully",
      task,
    };
  } catch (error) {
    console.error(`Error deleting task (${id}):`, error);
    throw error;
  }
};

const deleteAllTasks = async () => {
  try {
    const tasks = await Task.deleteMany(); // deletes all tasks
    return {
      success: true,
      error: false,
      status: 200,
      message: "All tasks deleted successfully",
      tasks,
    };
  } catch (error) {
    console.error("Error deleting all tasks:", error);
    throw error;
  }
};

const deleteTasksByUserId = async (userId) => {
  try {
    const tasks = await Task.deleteMany({ createdBy: userId });
    return {
      success: true,
      error: false,
      status: 200,
      message: "User tasks deleted successfully",
      tasks,
    };
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
