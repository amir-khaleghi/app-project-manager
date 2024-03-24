import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { TASK_STATUS } from '@prisma/client';
import { cookies } from 'next/headers';
import Button from './Button';
import Card from './Card';
import DeleteProject from './DeleteProject';
import CreateTask from './CreatTask';
import TaskItem from './TaskItem';

/* Get Data ------------------------- */
const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  });

  return tasks;
};
// ─── Comp ─────────────────────────────────────────── 🟩 ─

const TasksList = async ({ title, tasks, id }) => {
  /* delete Project -------------------------- */

  // get data from prop or data base
  const data = tasks || (await getData());

  // ─── Retrun ──────────────────────────────────────────────

  return (
    <Card className="p-8 ">
      <div className="flex justify-between items-center gap-4 pt-4">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        {/* <Button
          intent="text"
          className="text-violet-600"
        >
          + Create New
        </Button> */}
        <CreateTask id={id} />
      </div>
      <TaskItem data={data} />
    </Card>
  );
};

export default TasksList;
