const express = require('express');
const multer = require('multer');

const { getTodoList, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { todoValidator, customValidations } = require('../middleware/validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, './uploads/')

    },
    filename: (req, file, cb) => {

        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }

});

const limits = {
    fileSize: 1024 * 1024 * 10
};

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {

        cb(null, true)

    } else {

        cb(null, false)

    }
};

const upload = multer({ storage: storage, limits: limits, fileFilter: fileFilter });

router.get('/list', protect, getTodoList)

router.post('/', protect, upload.single('image'), todoValidator, customValidations, createTodo)

router.route('/:id').delete(protect, deleteTodo).put(protect, upload.single('image'), updateTodo)



module.exports = router
