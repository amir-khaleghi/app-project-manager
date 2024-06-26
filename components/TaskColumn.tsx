'use client';
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@prisma/client';
import TaskItem from './TaskItem';
import { useEffect, useState } from 'react';

interface TaskColumnProps {
  data: Task[];
  title: string;
  color: string;
}

// ─── Conmp ────────────────────────────────────────── 🟩 ─

const TaskColumn = ({ data, title, color }: TaskColumnProps) => {
  /* State ---------------------------- */
  const [tasks, setTask] = useState(data);

  useEffect(() => {
    setTask(data);
  }, [data]);

  /* Helper --------------------------- */
  const getTaskPos = (id: string) => tasks.findIndex((task) => task.id === id);

  /* Handler -------------------------- */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    setTask((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  /* Sensor --------------------------- */
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ─── Return ──────────────────────────────────────────────

  return (
    <div className="flex flex-col  w-full items-center border rounded-lg   ">
      <h1
        className={`w-full bg-${color}-300 rounded-md shadow-md font-mono font-bold  items-center justify-center flex p-2 mb-4 `}
      >
        {title}
      </h1>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="w-full  p-4 touch-none">
          <SortableContext
            items={tasks}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-2">
              {tasks.map((task, index) => (
                <TaskItem
                  id={task.id}
                  color={color}
                  key={task.id}
                  task={task}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};
export default TaskColumn;
