import React from "react";

function TaskTable({ tasks, markAsDone }) {
  return (
    <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan="3">No tasks available</td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>
                {task.status === "PENDING" && (
                  <button onClick={() => markAsDone(task.id)}>Mark as Done</button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TaskTable;
