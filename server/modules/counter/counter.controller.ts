import express from "express";
import CounterService from "./counter.service";
import CounterRepository from "./counter.repository";

const router = express.Router();
const protectedRoute = require('../../middleware/protectedRoute.middleware');

router.get('/', protectedRoute, async function (req, res, next) {
    try {
        const counters = await CounterRepository.findAll();
        return res.json(counters);
    } catch (e) {
        next(e);
    }
});

router.post('/increment/:id', protectedRoute, async function (req, res, next) {
    try {
        const {id} = req.params;
        const {value} = req.body;
        if (!id) return res.status(400).send('id and value are required');


        const counter = await CounterService.increment(Number(id), value || 1)


        return res.json(counter);
    } catch (e) {
        next(e);
    }
});

router.post('/decrement/:id', protectedRoute, async function (req, res, next) {
    try {
        const {id} = req.params;
        const {value} = req.body;
        if (!id) return res.status(400).send('id and value are required');

        const counter = await CounterService.decrement(Number(id), value || 1)
        return res.json(counter);
    } catch (e) {
        next(e);
    }
});


router.delete('/:id', protectedRoute, async function (req, res, next) {
    try {
        const {id} = req.params;
        const {value} = req.body;
        if (!id) return res.status(400).send('id and value are required');

        CounterRepository.delete(Number(id)).then((r) => {
            return res.json(r);
        });
    } catch (e) {
        next(e);
    }
});


module.exports = router;
