//@desc     Get Todo List
//@route    GET /api/goals
//@access   private
const getTodoList = (req, res) => {
    res.status(200).json({ message: 'Todo List' })
}


//@desc     Create Todo
//@route    POST /api/goals
//@access   private
const createTodo = (req, res) => {

    if (!req.body.task) {

        res.status(400);

        throw new Error('Please add a Task');

    }
    res.status(200).json({ message: 'Todo Created' })
}


//@desc     Update Todo
//@route    PUT /api/goals
//@access   private
const updateTodo = (req, res) => {
    res.status(200).json({ message: `Todo updated ${req.params.id}` })
}

//@desc     Delete  Todo
//@route    DELETE /api/goals
//@access   private
const deleteTodo = (req, res) => {
    res.status(200).json({ message: `Todo Deleted ${req.params.id}` })
}


module.exports = {
    getTodoList,
    createTodo,
    updateTodo,
    deleteTodo
}