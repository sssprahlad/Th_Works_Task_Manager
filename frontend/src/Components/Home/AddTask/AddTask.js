import { useEffect, useState } from "react";
import "./AddTask.css";
import { POST_TASK } from "../../../constants/Constant";

const AddTask = ({ onClose, setPopUpOpen, fetchTasks }) => {
  // const [filter, setFilter] = useState({status:"", priority:""});

  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    status: "",
  });

  const handleCancel = () => {
    onClose();
  };

  const handleClickOutSide = (e) => {
    if (e.target.classList.contains("add-task-main-container")) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddTask({ ...addTask, [name]: value });
  };

  console.log(addTask, "add task details");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(POST_TASK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(addTask),
      });
      console.log(response);
      if (response.status === 200) {
        setPopUpOpen(false);
        fetchTasks();
      }
      //console.log(await response.json());
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  return (
    <div className="add-task-main-container" onClick={handleClickOutSide}>
      <form className="add-task-container" onSubmit={handleSubmit}>
        <h1>Create New Task</h1>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Task Title"
            name="title"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            style={{ width: "100%" }}
            id="description"
            placeholder="Enter Task Description"
            name="description"
            onChange={handleInputChange}
            required
            className="textarea"
            cols={5}
            rows={4}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="priority">Status</label>
          <select
            className="add-taskselect"
            id="status"
            name="status"
            value={addTask?.status}
            onChange={handleInputChange}
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="priority">
            Priority
          </label>
          <select
            className="add-taskselect"
            id="priority"
            name="priority"
            value={addTask?.priority}
            required
            onChange={handleInputChange}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div
          className="form-grou"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="due date">Due Date</label>
          <input
            style={{ width: "100%" }}
            id="due date"
            type="date"
            name="due_date"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className="button-status-container">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="create-task">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
