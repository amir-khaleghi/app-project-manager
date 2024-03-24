const TaskItem = ({ data }) => {
  const todoTasks = data.filter((task) => task.status === 'NOT_STARTED');

  // console.log('🟩 // TasksList // ks:', todoTasks);
  const inProgressTasks = data.filter((task) => task.status === 'STARTED');
  const doneTasks = data.filter((task) => task.status === 'COMPLETED');
  return (
    <div className="flex flex-col sm:flex-row justify-between  ">
      {data && data.length ? (
        <>
          <div className="flex flex-col gap-2">
            <h1 className="bg-red-300 font-mono font-bold rounded-3xl items-center justify-center flex p-2 w-60 mb-4">
              Todo
            </h1>
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className=" flex flex-col gap-4 p-4 font-mono font-bold rounded-3xl items-center justify-center w-60 hover:cursor-pointer bg-red-100"
              >
                {task.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="bg-blue-300 font-mono font-bold rounded-3xl items-center justify-center flex p-2 w-60 mb-4">
              In Progress
            </h1>
            {inProgressTasks.map((task) => (
              <div
                key={task.id}
                className=" flex flex-col gap-4 p-4 font-mono font-bold rounded-3xl items-center justify-center w-60 hover:cursor-pointer bg-blue-100"
              >
                {task.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="bg-green-300 font-mono font-bold rounded-3xl items-center justify-center flex p-2 w-60 mb-4">
              Done
            </h1>
            {doneTasks.map((task) => (
              <div
                key={task.id}
                className=" flex flex-col gap-4 p-4 font-mono font-bold rounded-3xl items-center justify-center w-60 hover:cursor-pointer bg-green-100"
              >
                {task.name}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>no tasks</div>
      )}
    </div>
  );
};
export default TaskItem;
