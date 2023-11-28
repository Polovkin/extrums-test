import {MockDB, User, UserRepositoryInterface} from "../../types";

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../../mock.db.json');
const rawData = fs.readFileSync(jsonPath);
const MOCK_DB = JSON.parse(rawData) as MockDB;

class UserRepository implements UserRepositoryInterface {
    db: typeof MOCK_DB.users

    constructor(db: typeof MOCK_DB) {
        this.db = MOCK_DB.users
    }


    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    save(entity: User): Promise<User> {
        const index = this.db.findIndex(u => u.id === entity.id);
        if (index === -1) {
            throw new Error(`User with id ${entity.id} not found`);
        }
        const newUsers = [...this.db];
        newUsers[index] = entity;

        fs.writeFileSync(jsonPath, JSON.stringify({
            ...MOCK_DB,
            users: newUsers
        }, null, 2));

        return Promise.resolve(entity);
    }

    findById(id: number): Promise<User> {
        const result = this.db.find(u => u.id === id);
        if (!result) {
            throw new Error(`User with id ${id} not found`);
        }
        return Promise.resolve(result);
    }

    findByUsername(username: string): Promise<User> {
        const result = this.db.find(u => u.username === username);
        if (!result) {
            throw new Error(`User with username ${username} not found`);
        }
        return Promise.resolve(result);
    }

    findAll(): Promise<User[]> {
        const result = this.db;
        if (!result) {
            throw new Error(`Users not found`);
        }
        return Promise.resolve(result);
    }

    async delete(id: number): Promise<void> {
        const newUsers = this.db.filter(u => u.id !== id);

        await fs.writeFileSync(jsonPath, JSON.stringify({
            ...MOCK_DB,
            users: newUsers
        }, null, 2));
        this.db = newUsers;
        return Promise.resolve();
    }

   async update(entity: User): Promise<User> {
        const index = this.db.findIndex(u => u.id === entity.id);
        if (index === -1) {
            throw new Error(`User with id ${entity.id} not found`);
        }

        this.db[index] = entity;
        await fs.writeFileSync(jsonPath, JSON.stringify({
            ...MOCK_DB,
            users: this.db
        }, null, 2));

        return Promise.resolve(entity);
    }

}

export default new UserRepository(MOCK_DB);
