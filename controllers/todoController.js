const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');

//@desc     Get Todo List
//@route    GET /api/todoList
//@access   private
const getTodoList = asyncHandler(async (req, res) => {

    const todoList = await Todo.find();

    res.status(200).json(todoList);

})


//@desc     Create Todo
//@route    POST /api/todo
//@access   private
const createTodo = asyncHandler(async (req, res) => {

    if (!req.body.task) {

        res.status(400);

        throw new Error('Please add a Task');

    }

    const todo = await Todo.create({
        task: req.body.task
    });

    res.status(200).json({
        data: todo,
        message: 'Todo Created'
    });

})


//@desc     Update Todo
//@route    PUT /api/todo
//@access   private
const updateTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json({
        message: `Todo updated ${req.params.id}`, data: updatedTodo
    });

})

//@desc     Delete  Todo
//@route    DELETE /api/todo
//@access   private
const deleteTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    await todo.remove();

    res.status(200).json({ message: `Todo Deleted ${req.params.id}` });

})

module.exports = {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
}