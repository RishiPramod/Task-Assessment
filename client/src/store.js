import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/tasksSlice'
import authReducer from './slices/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store
