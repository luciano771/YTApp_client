
import { useNavigate } from "react-router-dom";

type Task = {
    id: number;
    title: string;
    description: string;
  };
  
  interface TaskCardProps {
    task: Task;
  }

function TaskCard({ task } : TaskCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-3 rounded-lg shadow-lg px-10 my-2 hover:cursor-pointer hover:bg-slate-300"
      onClick={() => navigate(`/tasks/${task.id}/edit`)}
    >
      <h3 className="font-bold text-xl">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskCard;
