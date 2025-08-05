import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../slices/tasksSlice';

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);

  const handleToggle = () => {
    dispatch(updateTask({ id: task._id, task: { ...task, completed: !task.completed } }));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(task.name);
  };

  const handleSave = () => {
    dispatch(updateTask({ id: task._id, task: { ...task, name } }));
    setIsEditing(false);
  };

  const categoryColors = {
    Personal: 'bg-blue-200 text-blue-800',
    Work: 'bg-yellow-200 text-yellow-800',
    Shopping: 'bg-green-200 text-green-800',
  };

  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="h-6 w-6 text-cyan-500 rounded-md border-gray-300 focus:ring-cyan-500 cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ml-4 flex-1 text-lg border-b-2 border-cyan-500 py-1 px-2 leading-tight focus:outline-none"
          />
        ) : (
          <span
            className={`ml-4 flex-1 text-lg ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.name}
          </span>
        )}
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-sm font-semibold rounded-full ${
            categoryColors[task.category] || 'bg-gray-200 text-gray-800'
          }`}
        >
          {task.category}
        </span>
        {isEditing ? (
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleSave}
              className="text-green-500 hover:text-green-700 transition-colors duration-300"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
