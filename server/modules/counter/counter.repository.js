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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, '../../mock.db.json');
const rawData = fs.readFileSync(jsonPath);
const MOCK_DB = JSON.parse(rawData);
class CounterRepository {
    constructor(db) {
        this.db = MOCK_DB.counter;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.db);
        });
    }
    saveAll(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const newDb = Object.assign(Object.assign({}, MOCK_DB), { counter: entities });
                const jsonData = JSON.stringify(newDb, null, 2);
                // @ts-ignore
                fs.writeFile(jsonPath, jsonData, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(entities);
                });
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const counter = this.db.find(u => u.id === id);
            if (!counter) {
                throw new Error(`Counter with id ${id} not found`);
            }
            return Promise.resolve(counter);
        });
    }
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCounter = Object.assign(Object.assign({}, entity), { id: this.db.length + 1, updatedAt: new Date() });
            const newDb = Object.assign(Object.assign({}, MOCK_DB), { counter: [...this.db, newCounter] });
            return new Promise((resolve, reject) => {
                const jsonData = JSON.stringify(newDb, null, 2);
                // @ts-ignore
                fs.writeFile(jsonPath, jsonData, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(newCounter);
                });
            });
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const index = this.db.findIndex(u => u.id === id);
                if (index === -1) {
                    reject(new Error(`Counter with id ${id} not found`));
                    return;
                }
                const newCounters = [...this.db];
                newCounters.splice(index, 1);
                const newDb = Object.assign(Object.assign({}, MOCK_DB), { counter: newCounters });
                const jsonData = JSON.stringify(newDb, null, 2);
                // @ts-ignore
                fs.writeFile(jsonPath, jsonData, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(newDb.counter);
                });
            });
        });
    }
    save(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const index = this.db.findIndex(u => u.id === entity.id);
                if (index === -1) {
                    this.create(entity).then(resolve).catch(reject);
                    return;
                }
                const newCounters = [...this.db];
                newCounters[index] = entity;
                const jsonData = JSON.stringify(Object.assign(Object.assign({}, MOCK_DB), { counter: newCounters }), null, 2);
                // @ts-ignore
                fs.writeFile(jsonPath, jsonData, (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(entity);
                });
            });
        });
    }
}
exports.default = new CounterRepository(MOCK_DB);
