import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../slices/authSlice'
import { clearError } from '../slices/authSlice'
import { toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    return () => dispatch(clearError())
  }, [error])

  useEffect(() => {
    if (isAuthenticated && !error) {
      navigate('/')
    }
  }, [isAuthenticated, error, navigate])

  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <div>
              <input
                id="password"
                type="password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className='w-full text-center'>
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-500">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login