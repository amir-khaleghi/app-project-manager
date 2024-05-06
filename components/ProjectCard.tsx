import { FC } from 'react';
import { Prisma } from '@prisma/client';
import Card from './Card';
import clsx from 'clsx';

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

/* Type ----------------------------- */
type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

/* Date Formater -------------------- */
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (t) => t.status === 'COMPLETED'
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);

  // ─── Return ──────────────────────────────────────────────

  return (
    <Card className="p-6 transition-all hover:bg-green-50 ">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-2xl text-gray-600">{project.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 mb-2 rounded-full bg-violet-200">
          {progress <= 30 ? (
            <div
              className="h-full text-xs text-center text-white bg-red-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          ) : progress > 30 && progress <= 70 ? (
            <div
              className="h-full text-xs text-center text-white bg-yellow-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          ) : (
            <div
              className="h-full text-xs text-center text-white bg-green-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>
        <div className="text-right">
          <span className="text-sm font-semibold text-gray-600">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
