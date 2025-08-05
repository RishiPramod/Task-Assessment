const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      completed, 
      priority, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query

    // Build filter object
    const filter = { createdBy: req.user.id }
    
    if (category && category !== 'all') {
      filter.category = category
    }
    
    if (completed !== undefined && completed !== 'all') {
      filter.completed = completed === 'true'
    }
    
    if (priority && priority !== 'all') {
      filter.priority = priority
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)

    // Execute queries
    const [tasks, totalTasks] = await Promise.all([
      Task.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Task.countDocuments(filter)
    ])

    const totalPages = Math.ceil(totalTasks / parseInt(limit))

    res.status(200).json({ 
      success: true, 
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalTasks,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const createTask = async (req, res) => {
  try {
    const { name, category = 'other', priority = 'medium' } = req.body
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, msg: "Task name is required" })
    }

    const task = await Task.create({
      name: name.trim(),
      category,
      priority,
      createdBy: req.user.id
    })
    
    res.status(201).json({ success: true, task })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID, createdBy: req.user.id })
    
    if (!task) {
      return res.status(404).json({ success: false, msg: `No task with id : ${taskID}` })
    }
    
    res.status(200).json({ success: true, task })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID, createdBy: req.user.id })
    
    if (!task) {
      return res.status(404).json({ success: false, msg: `No task with id : ${taskID}` })
    }
    
    res.status(200).json({ success: true, task })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const { name, category, priority, completed } = req.body
    
    const updateData = {}
    if (name !== undefined) updateData.name = name.trim()
    if (category !== undefined) updateData.category = category
    if (priority !== undefined) updateData.priority = priority
    if (completed !== undefined) updateData.completed = completed

    const task = await Task.findOneAndUpdate(
      { _id: taskID, createdBy: req.user.id }, 
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
    
    if (!task) {
      return res.status(404).json({ success: false, msg: `No task with id : ${taskID}` })
    }
    
    res.status(200).json({ success: true, task })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      { $match: { createdBy: req.user.id } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
          pendingTasks: { $sum: { $cond: ['$completed', 0, 1] } }
        }
      }
    ])

    const categoryStats = await Task.aggregate([
      { $match: { createdBy: req.user.id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } }
        }
      }
    ])

    res.status(200).json({
      success: true,
      stats: stats[0] || { totalTasks: 0, completedTasks: 0, pendingTasks: 0 },
      categoryStats
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, msg: "Something went wrong" })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
}