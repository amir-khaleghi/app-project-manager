import TasksList from '@/components/TasksList';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

/* Get Data ------------------------- */
const getData = async (id) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id: id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

const ProjectPage = async ({ params }) => {
  const project = await getData(params.id);

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TasksList
        tasks={project?.tasks}
        title={project?.name}
      />
    </div>
  );
};
export default ProjectPage;
