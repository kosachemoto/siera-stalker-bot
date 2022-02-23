import { ObserverCallback } from './types';

export class Observer<T extends ObserverCallback> {
    private listeners: Map<T, T> = new Map<T, T>();

    subscribe(listener: T) {
        this.listeners.set(listener, listener);
    }

    unsubscribe(listener: T) {
        this.listeners.delete(listener);
    }

    publish(data: Parameters<T>[0]) {
        this.listeners.forEach((listener) => listener(data));
    }
}