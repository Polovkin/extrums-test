import {FC, useEffect, useState} from "react";
import HttpService from "../services/Http.service";

export type Counter = {
    id: number;
    value: number;
    updatedAt: string;
}

type CounterItemProps = {
    counter: Counter;
    incrementCounter: (id: number) => void;
    decrementCounter: (id: number) => void;
    deleteCounter: (id: number) => void;
}

const CounterItem: FC<CounterItemProps> = ({counter, incrementCounter, decrementCounter, deleteCounter}) => {

    return (
        <div className="d-flex border p-3 justify-content-between align-items-center">
            <h3>Value: {counter.value}</h3>
            <div>
                <button className={'btn btn-success'} onClick={() => incrementCounter(counter.id)}>+</button>
                <button className={'btn btn-danger'} onClick={() => decrementCounter(counter.id)}>-</button>
            </div>
            <button className={'btn btn-danger'} onClick={() => deleteCounter(counter.id)}>Delete</button>
        </div>
    )
}


const Home = () => {
    const [counters, setCounters] = useState<Counter[]>([]);

    const fetchCounters = async () => {
        const response = await HttpService.get<Counter[]>('/counter');
        if (response?.data) {
            setCounters(response.data)
        }

    }

    const replaceCounter = (c: Counter) => {
        if (!c) return
        const newCounters = counters.map((counter) => {
            if (counter.id === c.id) return c
            return counter
        })
        setCounters(newCounters)
    }

    const incrementCounter = async (id: number) => {
        const response = await HttpService.post<Counter>(`/counter/increment/${id}`);
        if (response?.data) replaceCounter(response?.data)
        replaceCounter(response?.data)
    }

    const decrementCounter = async (id: number) => {
        const response = await HttpService.post<Counter>(`/counter/decrement/${id}`);
        replaceCounter(response?.data)
    }

    const deleteCounter = async (id: number) => {
       const response = await HttpService.delete<Counter[]>(`/counter/${id}`);
      if (response?.data) setCounters(response?.data)
    }

    useEffect(() => {
        void fetchCounters();
    }, []);

    useEffect(() => {
        console.log(counters)
    }, [counters]);


    return (
        <div className={'container'}>
            <h1>Counters</h1>
            {counters.map((counter) => <CounterItem
                key={counter.id}
                deleteCounter={deleteCounter}
                decrementCounter={decrementCounter}
                incrementCounter={incrementCounter}
                counter={counter}/>)}
        </div>
    )
}

export default Home;
