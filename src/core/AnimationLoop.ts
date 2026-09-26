export type AnimationCallback = (
    deltaTime: number,
    elapsedTime: number
) => void;

export class AnimationLoop {
    private readonly callback: AnimationCallback;

    private animationId: number | null = null;
    private previousTime = 0;
    private elapsedTime = 0;

    constructor(callback: AnimationCallback) {
        this.callback = callback;
    }

    public start(): void {
        if (this.animationId !== null) {
            return;
        }

        this.previousTime = performance.now();
        this.elapsedTime = 0;

        const loop = (currentTime: number): void => {
            const deltaTime =
                (currentTime - this.previousTime) / 1000;

            this.previousTime = currentTime;
            this.elapsedTime += deltaTime;

            this.callback(
                deltaTime,
                this.elapsedTime
            );

            this.animationId =
                requestAnimationFrame(loop);
        };

        this.animationId =
            requestAnimationFrame(loop);
    }

    public stop(): void {
        if (this.animationId === null) {
            return;
        }

        cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
}