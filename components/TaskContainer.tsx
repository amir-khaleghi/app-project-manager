'use client';

import { Task } from '@prisma/client';
import TaskColumn from './TaskColumn';
import { useEffect, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

type TaskColumnProps = {
  data: Task[];
  id?: string;
};

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const TaskContainer = ({ data, id }: TaskColumnProps) => {
  /* State ---------------------------- */
  const [tasks, setTask] = useState(data);

  useEffect(() => {
    setTask(data);
  }, [data]);
  /* Droppable ---------------------- */
  const { setNodeRef: setTodo } = useDroppable({
    id: 'todo',
  });

  const { setNodeRef: setInProgress } = useDroppable({
    id: 'in-progress',
  });
  const { setNodeRef: setDone } = useDroppable({
    id: 'done',
  });
  /* Handler ------------------------ */
  const handleTaskMove = (taskId: string, destinationColumn: string) => {
    setTask((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, column: destinationColumn };
        }
        return task;
      });
    });
  };

  /* Filter ------------------------- */
  const todoTasks = tasks?.filter((task) => task.status === 'NOT_STARTED');
  const inProgressTasks = tasks?.filter((task) => task.status === 'STARTED');
  const doneTasks = tasks?.filter((task) => task.status === 'COMPLETED');

  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start justify-center w-full gap-4 md:flex-row ">
        {tasks && tasks.length ? (
          <>
            {/*//ANCHOR Todo */}
            <TaskColumn
              data={todoTasks}
              title="Todo"
              color="gray"
              onTaskMove={handleTaskMove}
              droppableRef={setTodo}
            />
            {/*//ANCHOR  In Progress
             */}
            <TaskColumn
              data={inProgressTasks}
              title="In Progress"
              color="blue"
              onTaskMove={handleTaskMove}
              droppableRef={setInProgress}
            />
            {/*//ANCHOR done */}
            <TaskColumn
              data={doneTasks}
              title="Done"
              color="green"
              onTaskMove={handleTaskMove}
              droppableRef={setDone}
            />
          </>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </div>
  );
};
export default TaskContainer;
