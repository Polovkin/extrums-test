import {Counter, CounterRepositoryInterface, MockDB} from "../../types";

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../../mock.db.json');
const rawData = fs.readFileSync(jsonPath);
const MOCK_DB = JSON.parse(rawData) as MockDB;

class CounterRepository implements CounterRepositoryInterface {
    db: typeof MOCK_DB.counter

    constructor(db: typeof MOCK_DB) {
        this.db = MOCK_DB.counter
    }

    async findAll(): Promise<Counter[]> {
        return Promise.resolve(this.db);
    }

    async saveAll(entities: Counter[]): Promise<Counter[]> {
        return new Promise((resolve, reject) => {
            const newDb = {
                ...MOCK_DB,
                counter: entities
            }

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
    }

    async findById(id: number): Promise<Counter> {
        const counter = this.db.find(u => u.id === id);
        if (!counter) {
            throw new Error(`Counter with id ${id} not found`);
        }
        return Promise.resolve(counter);
    }

    async create(entity: Counter): Promise<Counter> {
        throw new Error("Method not implemented.");
    }

    async update(entity: Counter): Promise<Counter> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const index = this.db.findIndex(u => u.id === id);
            if (index === -1) {
                reject(new Error(`Counter with id ${id} not found`));
                return;
            }

            const newCounters = [...this.db];
            newCounters.splice(index, 1);

            const newDb = {
                ...MOCK_DB,
                counter: newCounters
            }

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
    }

    async save(entity: Counter): Promise<Counter> {
        return new Promise((resolve, reject) => {
            const index = this.db.findIndex(u => u.id === entity.id);
            if (index === -1) {
                reject(new Error(`Counter with id ${entity.id} not found`));
                return;
            }

            const newCounters = [...this.db];
            newCounters[index] = entity;

            const jsonData = JSON.stringify({
                ...MOCK_DB,
                counter: newCounters
            }, null, 2);

            // @ts-ignore
            fs.writeFile(jsonPath, jsonData, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(entity);
            });
        });
    }
}

export default new CounterRepository(MOCK_DB);
