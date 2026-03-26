require("dotenv").config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const port = 5000
const cors = require("cors")

app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
    console.log("mongoose connected successfully");

}).catch(() => {
    console.log("error occurred while connecting mongoose");

})

const toDoSchema = new mongoose.Schema({
    Title: String,
    Detail: String,
    Status: Boolean
})

const user = mongoose.model("ToDoData", toDoSchema);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const arrayOfTasks = []

app.post("/submit", async (req, res) => {


    const { Title, Detail, Status } = req.body


    try {
        let task = new user({
            Title: Title,
            Detail: Detail,
            Status: Status
        })
        await task.save()
        res.status(200).json({
            message: "task saved successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to save the task"
        })
    }

})
app.get("/data", async (req, res) => {
    try {
        let tasks = await user.find({})
        res.status(200).json({
            message: "tasks received successfully",
            data: tasks
        })
    } catch (error) {
        res.status(500).json({
            message: "erver error occured while receiving tasks",
        })
    }

})



app.put("/edit/:id", async (req, res) => {
    const id = req.params.id
    const { Title, Detail, Status } = req.body

    try {
        await user.updateOne({ _id: id }, { $set: { Title: Title, Detail: Detail, Status: Status } })
        res.status(404).json({
            message: "task updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "error occured while updating"
        })
    }
    // let findIndex = arrayOfTasks.findIndex((i) => i.id === id);
    // if (findIndex === -1) {
    //     res.status(404).json({
    //         message: "not found"
    //     })
    // } else {

    //     arrayOfTasks[findIndex] = {
    //         ...arrayOfTasks[findIndex],
    //         Title,
    //         Detail
    //     }
    //     res.status(200).json({
    //         message: "data updated succcessfully",
    //         data: arrayOfTasks
    //     })

    // }



})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id

    try {
        await user.deleteOne({ _id: id })
        res.status(200).json({
            message: "task deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "error occured while deleting task"
        })
    }
    // const findIndex = arrayOfTasks.findIndex((a) => a.id === id)
    // if (findIndex === -1) {
    //     res.status(404).json({
    //         message: "Task Not Found"
    //     })
    // }
    // else {


    //     arrayOfTasks.splice(findIndex, 1)
    //     res.status(200).json({
    //         message: "Task deleted succcessfully",

    //     })

    // }

})



app.put("/check/:id", async (req, res) => {
    const id = req.params.id
    const { Status } = req.body

    try {

        await user.updateOne({ _id: id }, { $set: { Status: Status } })
        res.status(500).json({
            message: "task checked successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "error occured while marking task"
        })


    }


    // let findIndex = arrayOfTasks.findIndex((i) => i.id === id);
    // if (findIndex === -1) {
    //     res.status(404).json({
    //         message: "not found"
    //     })
    // } else {

    //     arrayOfTasks[findIndex] = {
    //         ...arrayOfTasks[findIndex],
    //         status
    //     }
    //     res.status(200).json({
    //         message: "data updated succcessfully",
    //         data: arrayOfTasks
    //     })

    // }



})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})