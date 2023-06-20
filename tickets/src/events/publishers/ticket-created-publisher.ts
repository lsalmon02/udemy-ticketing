import { Publisher, Subjects, TicketCreatedEvent } from "@lsalmonticket/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
