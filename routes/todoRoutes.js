const express = require('express');
const router = express.Router();
const { getTodoList, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { todoValidator, customValidations } = require('../middleware/validator');

router.get('/list', getTodoList)

router.post('/', todoValidator, customValidations, createTodo)

router.route('/:id').delete(deleteTodo).put(todoValidator, customValidations, updateTodo)



module.exports = router
