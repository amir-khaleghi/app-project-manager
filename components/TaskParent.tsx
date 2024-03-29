import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { Task } from '@prisma/client';
import Card from './Card';
import TaskContainer from './TaskContainer';

/* Get Data ------------------------- */
// const getData = async () => {
//   const user = await getUserFromCookie(cookies());
//   const tasks = await db.task.findMany({
//     where: {
//       ownerId: user?.id,
//       NOT: {
//         // status: TASK_STATUS.COMPLETED,
//         deleted: false,
//       },
//     },
//     take: 5,
//     orderBy: {
//       due: 'asc',
//     },
//   });

//   return tasks;
// };

interface TaskParentProps {
  tasks: Task[];
  title: string;
  id: string;
}

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const TaskParent = async ({ tasks, title, id }: TaskParentProps) => {
  // const tasks = await getData();

  // ─── Retrun ──────────────────────────────────────────────

  return (
    <Card className="p-8">
      <div className="flex justify-center w-full items-center  pb-6">
        <span className="text-3xl text-gray-600">{title}</span>
      </div>
      <TaskContainer
        data={tasks}
        id={id}
      />
    </Card>
  );
};

export default TaskParent;
