import express from 'express';
import {PORT} from './config/env.js';
import usersRouter from './routes/users.route.js';
import authsRouter from './routes/auth.route.js';
import subscriptionsRouter from './routes/subscriptions.route.js';

const app = express();

app.use('/api/v1/auth', authsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

export default app;