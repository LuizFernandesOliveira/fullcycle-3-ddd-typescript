import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};
  
  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this._eventHandlers;
  }
  
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if(this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach((handler) => handler.handle(event));
    }
  }
  
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    
    this._eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = this._eventHandlers[eventName].filter((handler) => handler !== eventHandler);
    }
  }
  
  unregisterAll(): void {
    this._eventHandlers = {};
  }
  
}