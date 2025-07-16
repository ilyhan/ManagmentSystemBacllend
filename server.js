const express = require("express");
const app = express();
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const boardRouter = require('./routes/board.route');
const userRouter = require("./routes/user.route.");
const tasksRouter = require("./routes/tasks.route");

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        callback(null, true);
    },
    credentials: true
}));

app.use(express.json())

app.use('/api/auth', authRouter);
app.use('/api', boardRouter);
app.use('/api', userRouter);
app.use('/api', tasksRouter);

app.listen(3002, () => {
    console.log("Server is running on http://localhost:3002");
});