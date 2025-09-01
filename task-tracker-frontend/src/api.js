const BASE_URL = "http://localhost:8080/tasks"; // Backend URL

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    return null;
  }
};

// Mark a task as DONE
export const completeTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/complete`, {
      method: "PUT",
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  } catch (error) {
    console.error("Error completing task:", error);
