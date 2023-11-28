import CounterRepository from "./counter.repository";
import {Counter, CounterRepositoryInterface, CounterServiceInterface} from "../../types";
import cron from 'node-cron';

const cron_every_minute = '* * * * *';
const cron_every_10_seconds = '*/10 * * * * *';

class CounterService implements CounterServiceInterface {
    static repository: CounterRepositoryInterface;

    constructor(private repository: CounterRepositoryInterface) {
        this.repository = repository;
        this.startCron();
    }

    startCron() {
        // I know cron restart app in dev mode, because ts watch mode restart app on file change
        cron.schedule(cron_every_10_seconds, () => {
            console.log('Running cron job')
            void this.clearCounters();
        });
    }

    async clearCounters(): Promise<Counter[]> {
        const counters = await this.repository.findAll();
        if (!counters.length) {
           const newCounter = await this.repository.create({
                id: 1,
                value: 0,
                updatedAt: new Date()
            });
            return [newCounter]
        }
        const clearedCounters = counters.map(counter => {
            return {
                ...counter,
                value: 0
            }
        });
        return this.repository.saveAll(clearedCounters);
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
