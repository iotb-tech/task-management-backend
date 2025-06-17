const taskService = require('../services/task.service')

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const existingTask = await taskService.getTaskByTitle(title);
        if (existingTask) {
            return res.status(400).json({ error: 'Task with this title already exists.' });
        }
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTaskByUserId = async (req, res) => {
    try {
        const tasks = await taskService.getTaskByUserId(req.params.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, getTaskByUserId, updateTask, deleteTask }