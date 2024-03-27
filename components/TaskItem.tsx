'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task, color, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // ─── Return ──────────────────────────────────────────────

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`w-full p-4 bg-${color}-100   hover:bg-slate-200 rounded-md shadow-md font-mono font-bold  items-center  flex capitalize gap-4 text-lg mb-1`}
    >
      <input type="checkbox" />
      {task.name}
    </div>
  );
};
export default TaskItem;
