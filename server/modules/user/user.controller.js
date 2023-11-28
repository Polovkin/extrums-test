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
const user_repository_1 = __importDefault(require("./user.repository"));
const protectedRoute = require('../../middleware/protectedRoute.middleware');
const router = express_1.default.Router();
router.get('/', protectedRoute, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield user_repository_1.default.findAll());
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));
module.exports = router;
