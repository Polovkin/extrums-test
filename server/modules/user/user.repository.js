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
class UserRepository {
    constructor(db) {
        this.db = MOCK_DB.users;
    }
    create(user) {
        throw new Error("Method not implemented.");
    }
    save(entity) {
        const index = this.db.findIndex(u => u.id === entity.id);
        if (index === -1) {
            throw new Error(`User with id ${entity.id} not found`);
        }
        const newUsers = [...this.db];
        newUsers[index] = entity;
        fs.writeFileSync(jsonPath, JSON.stringify(Object.assign(Object.assign({}, MOCK_DB), { users: newUsers }), null, 2));
        return Promise.resolve(entity);
    }
    findById(id) {
        const result = this.db.find(u => u.id === id);
        if (!result) {
            throw new Error(`User with id ${id} not found`);
        }
        return Promise.resolve(result);
    }
    findByUsername(username) {
        const result = this.db.find(u => u.username === username);
        if (!result) {
            throw new Error(`User with username ${username} not found`);
        }
        return Promise.resolve(result);
    }
    findAll() {
        const result = this.db;
        if (!result) {
            throw new Error(`Users not found`);
        }
        return Promise.resolve(result);
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUsers = this.db.filter(u => u.id !== id);
            yield fs.writeFileSync(jsonPath, JSON.stringify(Object.assign(Object.assign({}, MOCK_DB), { users: newUsers }), null, 2));
            this.db = newUsers;
            return Promise.resolve();
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.db.findIndex(u => u.id === entity.id);
            if (index === -1) {
                throw new Error(`User with id ${entity.id} not found`);
            }
            this.db[index] = entity;
            yield fs.writeFileSync(jsonPath, JSON.stringify(Object.assign(Object.assign({}, MOCK_DB), { users: this.db }), null, 2));
            return Promise.resolve(entity);
        });
    }
}
exports.default = new UserRepository(MOCK_DB);
