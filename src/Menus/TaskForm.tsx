import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";

type Task = {
  title: string;
  description: string;
};

const TaskForm: React.FC = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id: string) => {
    const res = await fetch(`http://localhost:5000/tasks/tasks/${id}`);
    const data = await res.json();
    setTask({ title: data.title, description: data.description });
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/tasks/tasks/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = params.id
        ? `http://localhost:5000/tasks/tasks/${params.id}`
        : "http://localhost:5000/tasks/tasks";

      const method = params.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      await response.json();
      setLoading(false);
      navigate("/menus");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-bold text-2xl text-gray-800">
          {params.id ? "Editar Menú" : "Crear Menú"}
        </h3>
        <input
          type="text"
          name="title"
          placeholder="Write your title"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.title}
          autoFocus
        />
        <textarea
          name="description"
          rows={4}
          placeholder="Write your description"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.description}
        />
        <div className="flex justify-between">
          <Button handleMenu={() => handleSubmit} texto={loading ? "Cargando..." : "Guardar"} /> 
          
          {params.id && (
            <Button handleMenu={() => handleDelete(params.id!)} texto="Eliminar" /> 
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
