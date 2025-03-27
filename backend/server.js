const express = require ("express");
const dotenv = require ("dotenv").config();
const colors = require('colors')
const connectDB = require('../backend/config/db')
const {errorHandler} = require('../backend/middleware/errorMiddleWare')
const port = process.env.PORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

connectDB()

app.use('/api/goals', require('../backend/routes/routesGoals'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`));