import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  public dataTimeOccurred: Date;
  public eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}