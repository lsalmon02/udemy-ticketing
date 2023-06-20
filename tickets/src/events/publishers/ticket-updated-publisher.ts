import { Publisher, Subjects, TicketUpdatedEvent } from "@lsalmonticket/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
