import express from 'express';
import {PORT} from './config/env.js';
import indexRouter from './routes/index.route.js';
import usersRouter from './routes/users.route.js';
import authsRouter from './routes/auth.route.js';
import subscriptionsRouter from './routes/subscriptions.route.js';
import connectDB from './database/mongodb.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/api/v1/auth', authsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);


app.listen(PORT, async () => {
    console.log(`SubTrack API is listening on http://localhost:${PORT}`);
    await connectDB();
})

export default app;