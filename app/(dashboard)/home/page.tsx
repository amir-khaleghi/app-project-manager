import CreateProject from '@/components/CreateProject';
import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import ProjectCard from '@/components/ProjectCard';
import TasksList from '@/components/TasksList';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

/* Get Data ------------------------- */
const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

// ─── Comp ─────────────────────────────────────────── 🟩 ─

export default async function Page() {
  /* Get Data ----------------------- */
  const { projects } = await getData();
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="w-full grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex  gap-4 flex-wrap items-center mt-4  ">
          {projects.map((project) => (
            <div
              className="max-w-80 grow p-3 mx-1"
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
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TasksList />
          </div>
        </div>
      </div>
    </div>
  );
}
