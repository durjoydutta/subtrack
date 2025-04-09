import {Router} from 'express';

const authRouter = Router();


authRouter.post('/signup', (req, res) => {
    res.send({title: 'signup'});
})
authRouter.post('/login', (req, res) => {
    res.send({title: 'login'});
})
authRouter.post('/logout', (req, res) => {
    res.send({title: 'logout'});
})

export default authRouter;