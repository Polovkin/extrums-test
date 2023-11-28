"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const counter_service_1 = __importDefault(require("./counter.service"));
const counter_repository_1 = __importDefault(require("./counter.repository"));
const router = express_1.default.Router();
const protectedRoute = require('../../middleware/protectedRoute.middleware');
router.get('/', protectedRoute, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const counters = yield counter_repository_1.default.findAll();
            return res.json(counters);
        }
        catch (e) {
            next(e);
        }
    });
});
router.post('/increment/:id', protectedRoute, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { value } = req.body;
            if (!id)
                return res.status(400).send('id and value are required');
            const counter = yield counter_service_1.default.increment(Number(id), value || 1);
            return res.json(counter);
        }
        catch (e) {
            next(e);
        }
    });
});
router.post('/decrement/:id', protectedRoute, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { value } = req.body;
            if (!id)
                return res.status(400).send('id and value are required');
            const counter = yield counter_service_1.default.decrement(Number(id), value || 1);
            return res.json(counter);
        }
        catch (e) {
            next(e);
        }
    });
});
router.delete('/:id', protectedRoute, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { value } = req.body;
            if (!id)
                return res.status(400).send('id and value are required');
            counter_repository_1.default.delete(Number(id)).then((r) => {
                return res.json(r);
            });
        }
        catch (e) {
            next(e);
        }
    });
});
module.exports = router;
