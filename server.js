const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const dbTest = require('./config/dbConnectionTest');
const port = process.env.PORT || 3000;

dbTest()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todo', require('./routes/todoRoutes'));
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server Started on Port ${port}`))