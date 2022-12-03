import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe("Customer event testes", () => {
  it("should handler on customer created event notify", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        city: "City 1",
        zipCode: 59190000,
      },
      rewardPoints: 0,
      active: true,
    });
    
    eventDispatcher.notify(customerCreatedEvent);
    
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
  
  it("should handler on customer address changed event notify", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 1,
        city: "City 1",
        zipCode: 59190000,
      },
      rewardPoints: 0,
      active: true,
    });
    
    eventDispatcher.notify(customerAddressChangedEvent);
    
    expect(spyEventHandler).toHaveBeenCalled();
  });
});