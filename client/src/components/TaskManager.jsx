import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskList from './TaskList';
import AddTask from './AddTask';
import { clearError, fetchTasks } from '../slices/tasksSlice';
import { logout } from '../slices/authSlice'; // Import the logout action
import { toast } from 'react-hot-toast';

function TaskManager() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    return () => dispatch(clearError());
  }, [error, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => category === 'All' || task.category === category);

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user.username}!
          </h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <AddTask />

          <div className="flex items-center my-6">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow appearance-none bg-gray-200 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
            />
            <div className="relative ml-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
              >
                <option value="All">All Categories</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <TaskList tasks={paginatedTasks} />

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {page}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={paginatedTasks.length < tasksPerPage}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
