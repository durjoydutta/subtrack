import {Router} from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
    res.send({title: 'GET all users'});
})
usersRouter.post('/', (req, res) => {
    res.send({title: 'POST new user'});
})
usersRouter.get('/:id', (req, res) => {
    res.send({title: `GET user with id ${req.params.id}`});
})
usersRouter.put('/:id', (req, res) => {
    res.send({title: 'PUT an user'});
})
usersRouter.delete('/:id', (req, res) => {
    res.send({title: 'DELETE an user'});
})

export default usersRouter;