import {Router} from "express";

const subscriptionsRouter = Router();

//routes for root path '/'
subscriptionsRouter.route('/')
    .get((req, res) => {
        res.send({title: 'GET all subscriptions'});
    })
    .post((req, res) => {
        res.send({title: 'POST new subscription'});
    });

//routes for '/:id'
subscriptionsRouter.route('/:id')
    .get((req, res) => {
        res.send({title: `GET subscription id ${req.params.id}`});
    })
    .put((req, res) => {
        res.send({title: 'PUT an subscription'});
    })
    .delete((req, res) => {
        res.send({title: 'DELETE an subscription'});
    });

//routes for '/users/:id'
subscriptionsRouter.route('/users/:id')
    .get((req, res) => {
        res.send({title: `GET all subscriptions for user with id ${req.params.id}`});
    })
    .put((req, res) => {
        res.send({title: 'CANCEL an subscription'});
    });

//route for '/upcoming-renewals'
subscriptionsRouter.route('/upcoming-renewals')
    .get((req, res) => {
        res.send({title: 'GET all upcoming renewals'});
    });

export default subscriptionsRouter;