import React, { useState, useCallback, useEffect } from 'react';
import update from 'immutability-helper';
import type { Task } from '../types';
import DraggableTask from './DraggableTask';
import ControlBar from './ControlBar';
import TaskModal from './TaskModal';
import { useTaskContext } from '../TaskProvider';

const ItemType = 'TILE';

interface TaskListProps {
}

const TaskList: React.FC<TaskListProps> = ({ }) => {
  const { tasks, setTasks, addTask, editTask, deleteTask, importTask } = useTaskContext();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  const moveTask = useCallback((fromIndex: number, toIndex: number) => {
    setTasks((prevTasks) =>
      update(prevTasks, {
        $splice: [
          [fromIndex, 1],
          [toIndex, 0, prevTasks[fromIndex]],
        ],
      })
    );
  }, []);

  useEffect(() => {
  }, [tasks]); // <- this runs when `dataId` changes

  const flipAddTask = () => { setShowAddTask(!showAddTask) }
  const flipEditTask = () => { setShowEditTask(!showEditTask) }
  const startEditTask = (task: Task) => {
    setSelectedTask(task);
    flipEditTask();
  }

  return (
    <div>
      <ControlBar openAddTask={flipAddTask} importTask={importTask} tasksForExport={tasks} />
      <div className='task-list-header'>
        <h4 className='task-body'>Task</h4>
        <h4 className='input-body'>Input</h4>
        <h4 className='output-body'>Output</h4>
      </div>
      {tasks.map((task, index) => (
        <DraggableTask
          key={task.id ?? index}
          index={index}
          task={task}
          moveTask={moveTask}
          type={ItemType}
          deleteTask={deleteTask}
          editTask={startEditTask}
        />
      ))}

      {/* used for add task */}
      <TaskModal show={showAddTask} onClose={flipAddTask} onSubmit={addTask} />
      <TaskModal show={showEditTask} onClose={flipEditTask} onSubmit={editTask} initialTask={selectedTask} />
    </div>
  );
};

export default TaskList;
