const express = require('express');
const router = express.Router();
const { getTodoList, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController')

router.get('/list', getTodoList)

router.post('/', createTodo)

router.route('/:id').delete(deleteTodo).put(updateTodo)



module.exports = router
