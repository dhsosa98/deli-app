

interface EventEmitter {
    // eslint-disable-next-line @typescript-eslint/ban-types
    on(event: string, listener: Function): void;
    emit(event: string, data: any): void;
}

export default EventEmitter;
