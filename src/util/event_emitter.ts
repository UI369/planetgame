interface Events {
  [key: string]: Function[];
}

export class EventEmitter {
  public events: Events;
  constructor(events?: Events) {
    this.events = events || {};
  }

  public subscribe(name: string, cb: Function) {
    (this.events[name] || (this.events[name] = [])).push(cb);

    return {
      unsubscribe: () =>
        this.events[name] &&
        this.events[name].splice(this.events[name].indexOf(cb) >>> 0, 1),
    };
  }

  public emit(name: string, ...args: any[]): void {
    (this.events[name] || []).forEach((fn) => fn(...args));
  }
}

// Use like this:
// // Import the EventEmitter class
// import { EventEmitter } from './eventEmitter';

// // Create a new EventEmitter instance
// let eventSystem = new EventEmitter();

// // Subscribe to an event named 'eventName'
// let subscription = eventSystem.subscribe('eventName', (arg1, arg2) => {
//   console.log('Event happened with arguments:', arg1, arg2);
// });

// // Later, emit the 'eventName' event with arguments 'Hello' and 'world'
// eventSystem.emit('eventName', 'Hello', 'world');

// // If you want to unsubscribe from the event at some point
// subscription.unsubscribe();

// In this example, when eventSystem.emit('eventName', 'Hello', 'world'); is called, it will trigger the function subscribed to 'eventName', which will then log 'Event happened with arguments: Hello world'.
