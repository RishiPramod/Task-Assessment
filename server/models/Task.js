const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        enum: ['Personal', 'Work', 'Shopping', 'Other'],
        default: 'Other',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    createdBy: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
})

// Add index for better query performance
TaskSchema.index({ createdBy: 1, category: 1, completed: 1 })

module.exports = mongoose.model('Task', TaskSchema)