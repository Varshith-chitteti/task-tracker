import React, { useEffect, useState } from "react";
import { fetchTasks, addTask as addTaskAPI, updateTask } from "./api";
import "./App.css";
import AddTaskForm from "./addtaskform";

function App() {
 const [tasks, setTasks] = useState([]);
 const [popup, setPopup] = useState("");
 const [ratingPopupTask, setRatingPopupTask] = useState(null);
 const [selectedRating, setSelectedRating] = useState(0);
 const [ratings, setRatings] = useState({}); // store ratings per task

 const showPopup = (message) => {
   setPopup(message);
   setTimeout(() => setPopup(""), 2000);
 };

 const loadTasks = async () => {
   const data = await fetchTasks();
   if (data) setTasks(data);
 };

 useEffect(() => {
   loadTasks();
 }, []);

 // Add task
 const handleAddTask = async (task) => {
   const savedTask = await addTaskAPI(task);
   if (savedTask && savedTask.id) {
     setTasks([...tasks, savedTask]);
     showPopup("Task Added Successfully ✅");
   } else {
     showPopup("Failed to add task ❌");
   }
 };

 // Mark as done -> show rating popup
 const markAsDone = async (task) => {
   const updatedTask = { ...task, completed: true };
   const response = await updateTask(task.id, updatedTask);
   if (response && response.id) {
     setTasks(tasks.map((t) => (t.id === task.id ? response : t)));
     setRatingPopupTask(response); // open rating popup
     setSelectedRating(0); // reset rating
   }
 };

 // Confirm rating
 const confirmRating = () => {
   setRatings((prev) => ({
     ...prev,
     [ratingPopupTask.id]: selectedRating, // save rating for this task
   }));
   showPopup(`You rated "${ratingPopupTask.title}" ${selectedRating} ⭐`);
   setRatingPopupTask(null);
   setSelectedRating(0);
 };

 const total = tasks.length;
 const completed = tasks.filter((t) => t.completed).length;
 const pending = total - completed;

 return (
   <div className="app-container">
     <h1 className="app-title">Task Tracker</h1>
     <p className="app-subtitle">Stay organized and track your progress</p>

     {popup && (
       <>
         <div className="popup-overlay"></div>
         <div className="popup success">
           <p>{popup}</p>
           <button className="ok-button" onClick={() => setPopup("")}>
             OK
           </button>
         </div>
       </>
     )}

     {/* Task Summary */}
     <div className="task-summary">
       <div className="summary-box">
         <p>Total Tasks: {total}</p>
         <p className="completed">Completed: {completed}</p>
         <p className="pending">Pending: {pending}</p>
       </div>
     </div>

     {/* Task Form */}
     <AddTaskForm onAdd={handleAddTask} />

     {/* Task Table */}
     <table className="task-table">
       <thead>
         <tr>
           <th>Title</th>
           <th>Description</th>
           <th>Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         {tasks.map((task) => (
           <tr key={task.id} className={task.completed ? "completed" : ""}>
             <td>{task.title}</td>
             <td>{task.description}</td>
             <td>{task.completed ? "DONE" : "PENDING"}</td>
             <td>
               {!task.completed ? (
                 <button
                   onClick={() => markAsDone(task)}
                   className="done-button"
                 >
                   Mark as Done
                 </button>
               ) : (
                 <div className="rating-display">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <span
                       key={star}
                       className={`star ${
                         star <= (ratings[task.id] || 0) ? "filled" : ""
                       }`}
                     >
                       ★
                     </span>
                   ))}
                 </div>
               )}
             </td>
           </tr>
         ))}
       </tbody>
     </table>

     {/* Rating Popup */}
     {ratingPopupTask && (
       <>
         <div className="rating-popup-overlay"></div>
         <div className="rating-popup">
           <h3>Rate "{ratingPopupTask.title}"</h3>
           <div className="rating">
             {[1, 2, 3, 4, 5].map((star) => (
               <span
                 key={star}
                 className={`star ${
                   star <= selectedRating ? "filled" : ""
                 }`}
                 onClick={() => setSelectedRating(star)}
               >
                 ★
               </span>
             ))}
           </div>
           <button
             className="confirm-rating-button"
             onClick={confirmRating}
             disabled={selectedRating === 0}
           >
             Confirm
           </button>
         </div>
       </>
     )}
   </div>
 );
}

export default App;

