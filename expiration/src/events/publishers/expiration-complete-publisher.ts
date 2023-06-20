import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@lsalmonticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
