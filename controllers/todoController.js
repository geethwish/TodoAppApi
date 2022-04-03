const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = require('../config/db');

const Todos = require('../models/todos')(sequelize, Sequelize.DataTypes, Sequelize.Model);
const User = require('../models/user')(sequelize, Sequelize.DataTypes, Sequelize.Model);

//@desc     Get Todo List
//@route    GET /api/todoList
//@access   private
const getTodoList = asyncHandler(async (req, res) => {

    const todoList = await Todos.findAll({
        where: {
            userId: req.user.id
        }
    });

    res.status(200).json(todoList);

})


//@desc     Create Todo
//@route    POST /api/todo
//@access   private
const createTodo = asyncHandler(async (req, res) => {

    const todo = await Todos.create({
        task: req.body.task,
        description: req.body.description,
        status: req.body.status,
        image: req.file.path || "",
        userId: req.user.id
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

    // check for user
    if (!req.user) {

        res.status(401);

        throw new Error('Todo Record Not Found');

    }

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    if (todo.userId !== req.user.id) {

        res.status(401);

        throw new Error("You don't have permission to take actions");

    }

    const updatedTodo = await Todos.update(
        {
            task: req.body.task,
            description: req.body.description,
            status: req.body.status,
            image: req.body.image,
            userId: req.user.id
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

    const user = req.user;

    if (!user) {

        res.status(401);

        throw new Error('Todo Record Not Found');

    }

    if (!todo) {

        res.status(400);

        throw new Error('Todo Record Not Found');

    }

    if (todo.userId !== user.id) {

        res.status(401);

        throw new Error("You don't have permission to take actions");

    }


    const path = process.cwd() + '/' + todo.image;

    await todo.destroy({ where: { id: req.params.id } });

    try {

        fs.unlinkSync(path)

        console.log("fileRemoved");

    } catch (err) {

        console.error(err)
    }

    res.status(200).json({ message: `Todo Deleted ${req.params.id}`, data: todo });

})

module.exports = {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
}