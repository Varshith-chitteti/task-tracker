import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import { fetchTasks, createTask, completeTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from backend
  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Add a new task
  const handleAdd = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark task as DONE
  const handleComplete = async (id) => {
    try {
      const updatedTask = await completeTask(id);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Tracker</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskTable tasks={tasks} onComplete={handleComplete} />
    </div>
  );
}

export default App;
