import DeleteProject from '@/components/DeleteProject';
import TaskParent from '@/components/TaskParent';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

/* Get Data ------------------------- */
const getData = async (id: string) => {
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
// ─── Comp ─────────────────────────────────────────── 🟩 ─

const ProjectPage = async ({ params }: contextProps) => {
  const project = await getData(params.id);

  const id = params.id;
  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="h-full relative overflow-y-auto w-full">
      <DeleteProject id={params.id} />
      <TaskParent
        tasks={project.tasks}
        title={project.name}
        id={id}
      />
    </div>
  );
};
export default ProjectPage;
