import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../slices/tasksSlice';

function AddTask() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Personal');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(addTask({ name, completed: false, createdBy: user._id, category }));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center bg-gray-200 rounded-lg p-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none block bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-cyan-500"
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Shopping">Other</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <button
          type="submit"
          className="ml-4 flex-shrink-0 bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTask;