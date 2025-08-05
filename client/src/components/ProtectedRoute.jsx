import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthToken } from '../slices/authSlice'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
