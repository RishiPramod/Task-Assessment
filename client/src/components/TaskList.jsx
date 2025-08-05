import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 text-center">No tasks available</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;