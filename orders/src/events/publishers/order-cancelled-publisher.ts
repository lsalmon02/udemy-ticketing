import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@lsalmonticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
