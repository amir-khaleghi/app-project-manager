import Card from '@/components/Card';
import CreateProject from '@/components/CreateProject';
import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import ProjectCard from '@/components/ProjectCard';
import TaskContainer from '@/components/TaskContainer';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

/* Get Data ------------------------- */
async function getData() {
  const user = await getUserFromCookie(cookies());
  const projects = await db.project?.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  revalidatePath('/home');
  return projects;
}

/* Get Todays Tasks ----------------- */
/* Get Data ------------------------- */
async function getTodaysTasks() {
  const user = await getUserFromCookie(cookies());
  const todaysTasks = await db.task?.findMany({
    where: {
      ownerId: user?.id,
    },
    take: 5,
  });

  revalidatePath('/home');
  return todaysTasks;
}
//TODO

// ─── Comp ─────────────────────────────────────────── 🟩 ─

export default async function Page() {
  /* Get Data ----------------------- */
  const projects = await getData();
  const todaysTasks = await getTodaysTasks();

  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto">
      <div className=" h-full flex flex-col justify-between min-h-[content]">
        <div className="flex w-full grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-wrap items-center justify-around gap-2 mt-4 ">
          {projects?.map((project) => (
            <div
              className="w-60 grow "
              key={project.id}
            >
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-full p-3">
            <CreateProject />
          </div>
        </div>
        <div className="w-full rounded-3xl">
          <Card>
            <TaskContainer
              data={todaysTasks}
              title="Today's Tasks"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
