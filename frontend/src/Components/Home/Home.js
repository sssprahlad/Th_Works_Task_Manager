import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css"
import { CiFilter } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import AddTask from "./AddTask/AddTask";

const Home = () => {
    const [filter, setFilter] = useState({status:"", priority:""});
    const [popUpOpen, setPopUpOpen] = useState(false);

    return(
        <div className="home-container">
            
            <Navbar/>
            <div className="filter-container">
                <div className="filters-row-alignment">
                    <div className="filter-alignment">
                        <CiFilter/>
                        <select value={filter?.status} onChange={(e) => setFilter({...filter, status:e.target.value})}>
                            <option value="">All Status</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>


                    <div className="filter-alignment">
                        <CiFilter/>
                        <select value={filter?.status} onChange={(e) => setFilter({...filter, status:e.target.value})}>
                            <option value="">All Priorities</option>
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
                <AddTask onClose={() => setPopUpOpen(false)} setPopUpOpen={setPopUpOpen}/>
            )}
            
        </div>
    )
}

export default Home;