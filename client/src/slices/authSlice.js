import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser as loginUserAPI, registerUser as registerUserAPI } from './api'

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  isLoading: false,
  error: null,
  isAuthenticated: localStorage.getItem('token') ? true : false,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(credentials)
      if(!response.data.success) {
        return rejectWithValue(response.data.msg)
      }
      localStorage.setItem('token', JSON.stringify(response.data.token))
      localStorage.setItem('user', JSON.stringify(response.data.user))      
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserAPI(userData)
      if(!response.data.success) {
        return rejectWithValue(response.data.msg)
      } 
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, setAuthToken } = authSlice.actions

export default authSlice.reducer