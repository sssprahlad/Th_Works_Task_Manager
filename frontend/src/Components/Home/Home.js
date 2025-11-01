import { use, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css"
import { CiFilter } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import AddTask from "./AddTask/AddTask";
import { DELETE_TASK, GET_TASK ,PATCH_TASK} from "../../constants/Constant";

const Home = () => {
    const [filter, setFilter] = useState({status:"All", priority:"All"});
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);
   
console.log(filter,"filter")

    useEffect(() => {
        fetchTasks()  
    },[]);

    const fetchTasks = async () => {

        try{
            const response = await fetch(GET_TASK, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },

            });

            if(response.status === 200){
                const data = await response.json();
                setTasks(data?.data);
            }

        }catch(error){
            console.error(error);
            console.log(error);
            setTasks([]);
        }

    }

    console.log(tasks,"tasks");
    console.log(editingTask,"editing")

    const handleEditClick = (task) => {
        setEditingTask({...task});
        setEditingId(task.id);
    }
    const handleCancelClick  = () => {
        setEditingId(null);
        setEditingTask(null);   
    }

    const handleDeleteClick = async(id) => {
        console.log(id,"delete id")

        const isConfiremd = window.confirm("Are you sure you want to delete this Task");

        if(!isConfiremd){
            return
        }

        try{
            const response = await fetch(`${DELETE_TASK}/${id}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
            });
            if(response.status=== 200){
                console.log(response);
                setTimeout(() => {
                    fetchTasks();
                },1000);
            }
        }catch(error){
            console.error(error);
            console.log(error);
        }
        

    }


    const handleEditSaveClick = async (id) => {
        console.log(id);
        try{
            const response = await fetch(`${PATCH_TASK}/${id}`,{
            method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                },
                body:JSON.stringify(editingTask)
            });
            if(response.status=== 200){
                console.log(response);
                setTimeout(() => {
                    fetchTasks();
                },1000);
            }
        }catch(error){
            console.error(error);
            console.log(error);
        }
    }

    useEffect(() => {
      let filterData = tasks;

      if(filter.status !== "All"){
        filterData = tasks?.filter((task) => task.status === filter.status);
      }
      if(filter.priority !== "All"){
        filterData = tasks?.filter((task) => task?.priority === filter.priority);
      }

      setFilteredTasks(filterData);

    },[filter, tasks])

    console.log(filteredTasks,"filtered tasks")


    return(
        <div className="home-container">
            
            <Navbar/>
            <div className="filter-container">
                <div className="filters-row-alignment">
                    <div className="filter-alignment">
                        <CiFilter/>
                        <select value={filter?.status} onChange={(e) => setFilter({...filter, status:e.target.value})}>
                            <option value="All">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>


                    <div className="filter-alignment">
                        <CiFilter/>
                        <select value={filter?.priority} onChange={(e) => setFilter({...filter, priority:e.target.value})}>
                            <option value="All">All Priorities</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="filter-alignment add-color" onClick={() => setPopUpOpen(true)}>
                        <IoMdAdd/>
                        <h1>Add</h1>
                    </div>

                </div>

            </div>

            {popUpOpen && (
                <AddTask onClose={() => setPopUpOpen(false)} setPopUpOpen={setPopUpOpen} fetchTasks={fetchTasks}/>
            )}

            <div className="task-table-container">
                <table>
                    <thead>
                        <tr>
                            <th >S.no</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks?.length < 0 ? (<tr><td>Not Found</td></tr>) : (
                            <> 
                            {
                                filteredTasks?.map((eachTask, index) => {
                                    return(
                                    <tr key={index}>
                                        <td style={{paddinLeft:"10px", textAlign:"center"}}>{index + 1}.</td>
                                            <td>
                                                <input type="text"
                                                onChange={(e) => setEditingTask({...editingTask, title:e.target.value})}
                                                className={editingId ===eachTask.id ? "edittable-input" : "readonly-input"}
                                                readOnly={editingId !== eachTask.id}
                                                value={editingId === eachTask.id ? (editingTask?.title || "") : eachTask.title}
                                                />
                                            </td>

                                            <td>
                                                <textarea onChange={(e) => setEditingTask({...editingTask, description:e.target.value})}
                                                className={editingId ===eachTask.id ? "edittable-input width" : "readonly-input width"}
                                                readOnly={editingId !== eachTask.id}
                                                value={editingId === eachTask.id ? (editingTask?.description || "") : eachTask.description}
                                                >

                                                </textarea>
                                            </td>

                                            <td>
                                                <div className="filter-alignment1 wt">
                                                    {/* <CiFilter/> */}
                                                    <select onChange={(e) => setEditingTask({...editingTask, status:e.target.value})}
                                                     className={editingId ===eachTask.id ? "edittable-input" : "readonly-input"}
                                                    readOnly={editingId !== eachTask.id}
                                                    value={editingId === eachTask.id ? (editingTask?.status || "") : eachTask.status}
                                                    >
                                                        {!["Open","Done", "In Progress"].includes(eachTask?.status) && eachTask?.status &&(
                                                            <option value={eachTask?.status}>{eachTask?.status}</option>
                                                        )}
                                                        <option value="">All Status</option>
                                                        <option value="Open">Open</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Done">Done</option>
                                                    </select>
                                                </div>

                                            </td>


                                            <td>
                                                <div className="filter-alignment1 wt">
                                                    {/* <CiFilter/> */}
                                                    <select onChange={(e) => setEditingTask({...editingTask, priority:e.target.value})}
                                                     className={editingId ===eachTask.id ? "edittable-input" : "readonly-input"}
                                                    readOnly={editingId !== eachTask.id}
                                                    value={editingId === eachTask.id ? (editingTask?.priority || "") : eachTask.priority}
                                                    >
                                                        {!["High", "Low", "Medium"].includes(eachTask?.priority) && eachTask?.priority &&(
                                                            <option value={eachTask?.priority}>{eachTask?.priority}</option>
                                                        )}
                                                        <option value="">All Priorities</option>
                                                        <option value="High">High</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Low">Low</option>
                                                    </select>
                                                </div>
                                            </td>

                                            <td>
                                                 <input  type="date"  onChange={(e) => setEditingTask({...editingTask, due_date:e.target.value})}
                                                  className={editingId ===eachTask.id ? "edittable-input" : "readonly-input"}
                                                    readOnly={editingId !== eachTask.id}
                                                    value={editingId === eachTask.id ? (editingTask?.due_date || "") : eachTask.due_date}
                                                 />
                                            </td>
                                            
                                            <td>
                                                {
                                                    editingId === eachTask.id ? (
                                                        <div style={{display:"flex", gap:"1rem"}}>
                                                            <button className="btn save" type="button" onClick={() =>handleEditSaveClick(eachTask?.id) }>Save</button>
                                                            <button className="btn cancel" type="button" onClick={handleCancelClick}>Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <div style={{display:"flex", gap:"1rem"}}>
                                                            <button className="btn edit" type="button" onClick={() => {handleEditClick(eachTask)}}>Edit</button>
                                                            <button className="btn delete" type="button" onClick={() => handleDeleteClick(eachTask?.id) }>Delete</button>
                                                        </div>
                                                    )
                                                }
                                            </td>
                                    </tr>
                                    )

                                })
                            }
                            </>
                        )
                        }

                    </tbody>
                    </table>

            </div>
            
        </div>
    )
}

export default Home;