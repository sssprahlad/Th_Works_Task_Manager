const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");



router.post("/add-task", authMiddleware,(req, res) => {
    const {title, description,due_date,status, priority} = req.body;
    console.log(req.body);

    if(!title || !description || !due_date || !status || !priority){
        return res.status(400).json({message:"All fields are required"});
    }

    db.run("INSERT INTO tasks (title, description, due_date, status, priority) VALUES(?, ?, ?, ?, ?)",
        [title,description,due_date,status,priority], function(err){
            if(err){
                return res.status(500).json({message:"Failed to add task"});
            }

           return res.status(200).json({message:"Task added successfull", status:200});
        }
     )

})

router.get("/add-task",authMiddleware,(req, res) => {
 
    db.all("SELECT * FROM tasks", [],(err,rows) => {
        if(err){
            return res.status(500).json({message:"Failed to fetch tasks"});
        }
       return res.status(200).json({data:rows, message:"Tasks fetched successfully",status:200});
    })
})

router.delete("/add-task/:id", authMiddleware,(req, res) => {
    const {id} = req.params;
   
    db.run("DELETE from tasks WHERE id = ?", [id], (err) => {
        if(err){
            res.status(500).json({message:"Failed to delete task"});
        }
       return res.status(200).json({message:"Task deleted successfully", status:200});
    })
});

router.patch("/add-task/:id",authMiddleware, (req,res) => {
    const {id} = req.params;
    const {title,description,status,due_date,priority} = req.body;
    console.log(req.body);

    db.run("UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ?, priority = ? WHERE id = ?", [title,description,status,due_date,priority,id], (err) => {
        if(err){
            return res.status(500).json({message:"Failed to update task"});
        }

       return res.status(200).json({message:"Project updated successfully", status:200});

    });
});

module.exports = router;