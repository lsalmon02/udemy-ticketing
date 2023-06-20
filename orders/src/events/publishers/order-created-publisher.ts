import { Publisher, OrderCreatedEvent, Subjects } from "@lsalmonticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
