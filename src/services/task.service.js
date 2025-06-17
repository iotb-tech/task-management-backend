const Task = require('../models/Task');

const createTask = async (data, userId) => {
  try {
    if (!data.title || !data.description || !data.category || !data.startTime || !data.endTime) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'Missing required fields',
      };
    }

    const existingTask = await Task.findOne({ title: data.title });
    if (existingTask) {
      return {
        success: false,
        error: true,
        status: 400,
        message: 'Task with this title already exists',
      };
    }

    const task = new Task({
      createdBy: userId,
      ...data,
    });
    await task.save();

    return {
      success: true,
      error: false,
      status: 201,
      message: 'Task created successfully',
      task,
    };
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};

const getAllTasks = async () => {
  try {
    const tasks = await Task.find().populate('createdBy', 'full_name email');
    return tasks;
  } catch (error) {
    throw new Error('Error retrieving tasks');
  }
};

const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id).populate('createdBy', 'full_name email');
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error('Error retrieving task by ID');
  }
};

const getTaskByUserId = async (userId) => {
  try {
    const tasks = await Task.find({ createdBy: userId }).populate('createdBy', 'full_name email');
    return tasks;
  } catch (error) {
    throw new Error('Error retrieving tasks by user ID');
  }
};

const updateTask = async (taskId, data) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  } catch (error) {
    throw new Error('Error updating task');
  }
};

const deleteTask = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    await task.remove();
    return { message: 'Task deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting task');
  }
};

const getTaskByTitle = async (title) => {
  try {
    return await Task.findOne({ title });
  } catch (error) {
    throw new Error('Error fetching task by title');
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  updateTask,
  deleteTask,
  getTaskByTitle,
};
