import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async(req , res , next )=>{
    try {
        const {title , description} = req.body
        const task = await Task.create({title , description , user : req.user})

        if(!task) return next(new ErrorHandler( 404 , "Failed to Add Task" ))

        res.status(201).json({
            success : true ,
            message : "Task Added",
        })
    } catch (error) {
      next(error)  
    }
}

export const getMyTask = async(req , res , next )=>{
    try {
        const tasks = await Task.find({ user : req.user._id})

        res.status(200).json({
            success : true ,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req , res , next )=>{
    try {
        const task = await Task.findById(req.params.id)

        if(!task) return next(new ErrorHandler( 404 , "Task Not found" )) 

        task.isCompleted = !task.isCompleted
        await task.save()


        res.status(200).json({
            success : true ,
            message : "Task Updated!",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req , res , next )=>{
    try {
        const task = await Task.findById(req.params.id)
    
        if(!task) return next(new ErrorHandler( 404 , "Task Not found" ))

        await task.deleteOne()

        res.status(200).json({
            success : true ,
            message : "Task Deleted!",
        })
    } catch (error) {
        next(error)
    }
}