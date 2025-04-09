import {Router} from "express";

const subscriptionsRouter = Router();

subscriptionsRouter.get('/', (req, res) => {
    res.send({title: 'GET all subscriptions'});
})
subscriptionsRouter.post('/', (req, res) => {
    res.send({title: 'POST new subscription'});
})
subscriptionsRouter.get('/:id', (req, res) => {
    res.send({title: `GET subscription id ${req.params.id}`});
})
subscriptionsRouter.put('/:id', (req, res) => {
    res.send({title: 'PUT an subscription'});
})
subscriptionsRouter.delete('/:id', (req, res) => {
    res.send({title: 'DELETE an subscription'});
})
subscriptionsRouter.get('/users/:id', (req, res) => {
    res.send({title: `GET all subscriptions for user with id ${req.params.id}`});
})
subscriptionsRouter.put('/users/:id', (req, res) => {
    res.send({title: 'CANCEL an subscription'});
})
subscriptionsRouter.get('/upcoming-renewals', (req, res) => {
    res.send({title: 'GET all upcoming renewals'});
})

export default subscriptionsRouter;