import EventEmitterInterface from "@/common/infraestructure/events/EventEmitter.interface";
import { injectable } from "inversify";
import { EventEmitter as NodeEventEmitter } from "stream";

@injectable()
class EventEmitter extends NodeEventEmitter implements EventEmitterInterface {

}

export default EventEmitter;
