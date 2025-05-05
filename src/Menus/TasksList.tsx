import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
};

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks/tasks");
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))} 
    </div> 
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum recusandae sit reiciendis distinctio et rerum, in sapiente ipsa? Incidunt, perspiciatis praesentium facere iure dolores unde distinctio minima fugiat sit! Aut?
    </div>
    
  );
  
};

export default TasksList;
