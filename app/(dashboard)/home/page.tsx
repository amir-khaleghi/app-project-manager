import CreateProject from '@/components/CreateProject';
import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import ProjectCard from '@/components/ProjectCard';
import TaskParent from '@/components/TaskParent';
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
//TODO

// ─── Comp ─────────────────────────────────────────── 🟩 ─

export default async function Page() {
  /* Get Data ----------------------- */
  const projects = await getData();

  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full">
      <div className=" h-full flex flex-col justify-between min-h-[content]">
        <div className="w-full grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex  gap-2 flex-wrap items-center mt-4  justify-around ">
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
          <TaskParent title="Today's Tasks" />
        </div>
      </div>
    </div>
  );
}
