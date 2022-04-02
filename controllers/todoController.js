const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');;

const Todos = require('../models/todos')
    (sequelize, Sequelize.DataTypes, Sequelize.Model);

//@desc     Get Todo List
//@route    GET /api/todoList
//@access   private
const getTodoList = asyncHandler(async (req, res) => {

    const todoList = await Todos.findAll();

    res.status(200).json(todoList);

})


//@desc     Create Todo
//@route    POST /api/todo
//@access   private
const createTodo = asyncHandler(async (req, res) => {

    let imageFile;
    let uploadPath;
    let imageModifiedName;


    if (!req.body.task) {

        res.status(400);

        throw new Error('Please add a Task');

    }

    const todo = await Todos.create({
        //task: req.body.task
        task: req.body.task,
        description: req.body.description,
        status: req.body.status,
        image: req.file.path || "",
        userId: "1"
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

    const todo = await Todos.findByPk(req.params.id);

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    const updatedTodo = await Todos.update(
        {
            task: req.body.task,
            description: req.body.description,
            status: req.body.status,
            image: req.body.image,
            userId: "1"
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    res.status(200).json({
        message: `Todo updated ${req.params.id}`, data: updatedTodo
    });

})

//@desc     Delete  Todo
//@route    DELETE /api/todo
//@access   private
const deleteTodo = asyncHandler(async (req, res) => {

    const todo = await Todos.findByPk(req.params.id);

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    await todo.destroy({ where: { id: req.params.id } });

    res.status(200).json({ message: `Todo Deleted ${req.params.id}` });

})

module.exports = {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
}