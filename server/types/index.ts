import {Request} from 'express';
import {JwtPayload} from "jsonwebtoken";

export type AuthRequest = {
    username: string;
    password: string;
}

export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    role: USER_ROLES;
}

export type Counter = {
    id: number;
    value: number;
    updateAt: string;
}

export type USER_ROLES = 'admin' | 'user';

export type AppRequest = Request & { user: string | JwtPayload | undefined };

export type MockDB = {
    users: User[];
    counter: Counter[];
}

interface CrudRepository<T> {
    findAll(): Promise<T[]>;

    findById(id: number): Promise<T>;

    create(entity: T): Promise<T>;

    update(entity: T): Promise<T>;

    delete(id: number): Promise<void>;

    save(entity: T): Promise<T>;
}


export interface AuthServiceInterface {
    login({username, password}: AuthRequest): Promise<string>;

    register({username, password, email}: AuthRequest & { email: string }): Promise<string>;
}

export interface CounterServiceInterface {
    increment(id: number, value: number): Promise<Counter>

    decrement(id: number, value: number): Promise<Counter>
}

export interface UserRepositoryInterface extends CrudRepository<User> {
    findByUsername(username: string): Promise<User>;
}

export interface CounterRepositoryInterface extends CrudRepository<Counter> {
}
