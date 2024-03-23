import DeleteProject from '@/components/DeleteProject';
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
interface contextProps {
  params: {
    id: string;
  };
}
const ProjectPage = async ({ params }: contextProps) => {
  const project = await getData(params.id);

  return (
    <div className="h-full relative overflow-y-auto w-full">
      <DeleteProject id={params.id} />
      <TasksList
        id={project?.id}
        tasks={project?.tasks}
        title={project?.name}
      />
    </div>
  );
};
export default ProjectPage;
