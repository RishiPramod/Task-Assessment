import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './api'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await api.fetchTasks(params)
    if (!response.data.success) {
      return rejectWithValue(response.data.msg)
    }
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Failed to fetch tasks')
  }
})

export const addTask = createAsyncThunk('tasks/addTask', async (task, { rejectWithValue }) => {
  try {
    const response = await api.addTask(task)
    if (!response.data.success) {
      return rejectWithValue(response.data.msg)
    }
    return response.data.task
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Failed to add task')
  }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, task }, { rejectWithValue }) => {
  try {
    const response = await api.updateTask(id, task)
    if (!response.data.success) {
      return rejectWithValue(response.data.msg)
    }
    return response.data.task
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Failed to update task')
  }
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    const response = await api.deleteTask(id)
    if (!response.data.success) {
      return rejectWithValue(response.data.msg)
    }
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Failed to delete task')
  }
})

export const fetchTaskStats = createAsyncThunk('tasks/fetchTaskStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.getTaskStats()
    if (!response.data.success) {
      return rejectWithValue(response.data.msg)
    }
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || 'Failed to fetch task stats')
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalTasks: 0,
      hasNext: false,
      hasPrev: false
    },
    stats: {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0
    },
    categoryStats: [],
    filters: {
      category: 'all',
      completed: 'all',
      priority: 'all',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'all',
        completed: 'all',
        priority: 'all',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.tasks
        state.pagination = action.payload.pagination
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Something went wrong'
      })
      
      // Add Task
      .addCase(addTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.unshift(action.payload)
        state.stats.totalTasks += 1
        state.stats.pendingTasks += 1
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Something went wrong'
      })
      
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id)
        if (index !== -1) {
          const oldTask = state.items[index]
          state.items[index] = action.payload
          
          // Update stats if completion status changed
          if (oldTask.completed !== action.payload.completed) {
            if (action.payload.completed) {
              state.stats.completedTasks += 1
              state.stats.pendingTasks -= 1
            } else {
              state.stats.completedTasks -= 1
              state.stats.pendingTasks += 1
            }
          }
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Something went wrong'
      })
      
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskIndex = state.items.findIndex((task) => task._id === action.payload)
        if (taskIndex !== -1) {
          const deletedTask = state.items[taskIndex]
          state.items = state.items.filter((task) => task._id !== action.payload)
          
          // Update stats
          state.stats.totalTasks -= 1
          if (deletedTask.completed) {
            state.stats.completedTasks -= 1
          } else {
            state.stats.pendingTasks -= 1
          }
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Something went wrong'
      })
      
      // Fetch Task Stats
      .addCase(fetchTaskStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats
        state.categoryStats = action.payload.categoryStats
      })
      .addCase(fetchTaskStats.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong'
      })
  },
})

export const { clearError, setFilters, resetFilters } = tasksSlice.actions
export default tasksSlice.reducer