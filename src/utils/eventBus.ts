type Event = string;
type Listener = <T>(...args: T[]) => void;

export default class EventBus {
  listeners: { [key: string]: Listener[] };

  constructor() {
    this.listeners = {};
  }

  on(event: Event, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: Event, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback,
    );
  }

  emit<T>(event: Event, ...args: T[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
