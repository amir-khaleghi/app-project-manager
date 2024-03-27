'use client';

import { Task } from '@prisma/client';
import CreateTask from './CreatTask';
import TaskColumn from './TaskColumn';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type TaskColumnProps = {
  tasks: Task[];
  id: string;
};

const TaskContainer = ({ tasks, id }: TaskColumnProps) => {
  /* Handler ------------------------ */

  const { mutate: updatedTasks, isPending } = useMutation({
    mutationFn: (updatedPost) => {
      return axios.patch(`/api/posts/${id}`, updatedPost);
    },
    onError: (error) => {
      console.log('We have error in mutation', error);
    },
    onSuccess: () => {
      router.push(`/`);
      router.refresh();
    },
  });

  /* Filter ------------------------- */
  const todoTasks = tasks?.filter((task) => task.status === 'NOT_STARTED');

  // console.log('🟩 // TaskContainer // todoTasks:', todoTasks);
  const inProgressTasks = tasks?.filter((task) => task.status === 'STARTED');
  const doneTasks = tasks?.filter((task) => task.status === 'COMPLETED');

  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-center items-start w-full  gap-4">
        {tasks && tasks.length ? (
          <>
            {/*//ANCHOR Todo */}
            <TaskColumn
              data={todoTasks}
              title="Todo"
              color="gray"
            />
            {/*//ANCHOR  In Progress
             */}
            <TaskColumn
              data={inProgressTasks}
              title="In Progress"
              color="blue"
            />
            {/*//ANCHOR done */}
            <TaskColumn
              data={doneTasks}
              title="Done"
              color="green"
            />
          </>
        ) : (
          <div>no tasks</div>
        )}
      </div>
      <CreateTask id={id} />
    </div>
  );
};
export default TaskContainer;
