const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authMiddleware')
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTaskStats,
} = require('../controllers/tasks')

router.route('/').all(authenticateUser).get(getAllTasks).post(createTask)
router.route('/stats').all(authenticateUser).get(getTaskStats)
router.route('/:id').all(authenticateUser).get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router