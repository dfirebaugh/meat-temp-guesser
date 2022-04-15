
import { Injectable } from './di';

@Injectable("TemperatureService")
export default class {
    entries: Map<number, number> = new Map();
    listeners: Array<Function> = [];
    guess: number;

    enqueue = (temperature: number): void => {
        this.entries.set(Date.now(), temperature)
        this.updateListeners();
    }

    dequeue = (time: number) => {
        this.entries.delete(time)
        this.updateListeners()
    }

    updateListeners = () => {
        this.listeners.forEach(l => l(this.toArray()));
    }

    registerListener = listener => {
        this.listeners.push(listener);
    }

    toArray = (): Array<{ temperature: number; time: number }> => {
        const entriesArray: Array<{ temperature: number; time: number }> = [];
        for (const prop of this.entries.keys())
            entriesArray.push({temperature: this.entries.get(prop), time: prop})
            
        return entriesArray;
    }
}
