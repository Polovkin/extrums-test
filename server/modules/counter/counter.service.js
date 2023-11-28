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
const counter_repository_1 = __importDefault(require("./counter.repository"));
const node_cron_1 = __importDefault(require("node-cron"));
const cron_every_minute = '* * * * *';
const cron_every_10_seconds = '*/10 * * * * *';
class CounterService {
    constructor(repository) {
        this.repository = repository;
        this.repository = repository;
        this.startCron();
    }
    startCron() {
        // I know cron restart app in dev mode, because ts watch mode restart app on file change
        node_cron_1.default.schedule(cron_every_10_seconds, () => {
            console.log('Running cron job');
            void this.clearCounters();
        });
    }
    clearCounters() {
        return __awaiter(this, void 0, void 0, function* () {
            const counters = yield this.repository.findAll();
            if (!counters.length) {
                const newCounter = yield this.repository.create({
                    id: 1,
                    value: 0,
                    updatedAt: new Date()
                });
                return [newCounter];
            }
            const clearedCounters = counters.map(counter => {
                return Object.assign(Object.assign({}, counter), { value: 0 });
            });
            return this.repository.saveAll(clearedCounters);
        });
    }
    decrement(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const counter = yield this.repository.findById(id);
            const updatedAt = new Date();
            const newValue = Object.assign(Object.assign({}, counter), { value: counter.value - value, updatedAt });
            if (newValue.value < 0) {
                throw new Error('Counter cannot be less than 0');
            }
            return yield this.repository.save(newValue);
        });
    }
    increment(id, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const counter = yield this.repository.findById(id);
            const updatedAt = new Date();
            const newValue = Object.assign(Object.assign({}, counter), { value: counter.value + value, updatedAt });
            if (newValue.value < 0) {
                throw new Error('Counter cannot be less than 0');
            }
            return yield this.repository.save(newValue);
        });
    }
}
exports.default = new CounterService(counter_repository_1.default);
