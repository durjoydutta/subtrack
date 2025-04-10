import {Router} from 'express';

const usersRouter = Router();

//routes for root path '/'
usersRouter.route('/')
    .get((req, res) => {
        res.send({title: 'GET all users'});
    })
    .post((req, res) => {
        res.send({title: 'POST new user'});
    });

//routes for '/:id'
usersRouter.route('/:id')
    .get((req, res) => {
        res.send({title: `GET user with id ${req.params.id}`});
    })
    .put((req, res) => {
        res.send({title: 'PUT an user'});
    })
    .delete((req, res) => {
        res.send({title: 'DELETE an user'});
    });

export default usersRouter;