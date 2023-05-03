class EventEmitter extends EventTarget {
    emit (key:string) {
        this.dispatchEvent(new Event(key));
    }
}

export default EventEmitter;