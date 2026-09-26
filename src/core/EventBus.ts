type EventCallback<T = unknown> = (data: T) => void;

export class EventBus {
    private readonly events = new Map<
        string,
        Set<EventCallback>
    >();

    public on<T>(
        event: string,
        callback: EventCallback<T>
    ): void {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }

        this.events
            .get(event)!
            .add(callback as EventCallback);
    }

    public off<T>(
        event: string,
        callback: EventCallback<T>
    ): void {
        this.events
            .get(event)
            ?.delete(callback as EventCallback);
    }

    public emit<T>(
        event: string,
        data?: T
    ): void {
        this.events
            .get(event)
            ?.forEach((callback) => {
                callback(data);
            });
    }

    public clear(): void {
        this.events.clear();
    }
}