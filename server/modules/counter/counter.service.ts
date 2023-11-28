import CounterRepository from "./counter.repository";
import {Counter, CounterRepositoryInterface, CounterServiceInterface} from "../../types";

class CounterService implements CounterServiceInterface {
    static repository: CounterRepositoryInterface;

    constructor(private repository: CounterRepositoryInterface) {
        this.repository = repository;
    }

    async decrement(id: number, value: number): Promise<Counter> {
        const counter = await this.repository.findById(id);
        const updatedAt = new Date();
        const newValue = {
            ...counter,
            value: counter.value - value,
            updatedAt
        }
        if (newValue.value < 0) {
            throw new Error('Counter cannot be less than 0');
        }
        return await this.repository.save(newValue);
    }

    async increment(id: number, value: number): Promise<Counter> {
        const counter = await this.repository.findById(id);
        const updatedAt = new Date();
        const newValue = {
            ...counter,
            value: counter.value + value,
            updatedAt
        }
        if (newValue.value < 0) {
            throw new Error('Counter cannot be less than 0');
        }
        return await this.repository.save(newValue);
    }
}

export default new CounterService(CounterRepository);
