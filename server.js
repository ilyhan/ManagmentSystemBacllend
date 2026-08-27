const express = require("express");
const app = express();
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const boardRouter = require('./routes/board.route');
const userRouter = require("./routes/user.route.");
const tasksRouter = require("./routes/tasks.route");
const trackingRouter = require("./routes/tracking.route");
const documentationRouter = require("./routes/documentation.route");

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
app.use('/api/tracking', trackingRouter);
app.use('/api', documentationRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});