import { useEffect,useState } from "react";
import "./AddTask.css";



const AddTask = ({onClose, setPopUpOpen}) => {
    const [filter, setFilter] = useState({status:"", priority:""});

    const handleCancel = () => {
        onClose();
    }

    const handleClickOutSide = (e) => {
        if(e.target.classList.contains("add-task-main-container")){
            onClose();
        }
    }

    useEffect(() => {
        const handleEsc = (e) => {
            if(e.key === "Escape"){
                onClose();
            }
        }
        window.addEventListener("keydown",handleEsc);
        return () => window.removeEventListener("keydown",handleEsc);
    },[onClose])



    return(
        <div className="add-task-main-container" onClick={handleClickOutSide}>
            <div className="add-task-container">
            <h1>Create New Task</h1>

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Enter Task Title"/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Enter Task Description" className="textarea" cols={5} rows={4}></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                    <select className="add-taskselect" id="priority" value={filter?.status} onChange={(e) => setFilter({...filter, status:e.target.value})}>
                                <option value="">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
            </div>

            <div className="form-group">
                <label htmlFor="status" className="status">Status</label>
                <select className="add-taskselect" id="status" value={filter?.status} onChange={(e) => setFilter({...filter, status:e.target.value})}>
                                <option value="">All Priorities</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
            </div>

            <div className="form-group">
                <label htmlFor="due date">Due Date</label>
                <input id="due date" type="date" />
            </div>

            <div className="button-status-container">
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                <button className="create-task">Create Task</button>

            </div>




            </div>
        </div>
    )
}

export default AddTask;