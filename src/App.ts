import { SceneManager } from './core/SceneManager';
import { Renderer } from './core/Renderer';
import { CameraManager } from './core/CameraManager';
import { AnimationLoop } from './core/AnimationLoop';
import { EventBus } from './core/EventBus';
import { StarField } from './galaxy/StarField';
import { Galaxy } from './galaxy/Galaxy';

export class App {
    private readonly container: HTMLElement;

    private readonly sceneManager: SceneManager;
    private readonly renderer: Renderer;
    private readonly cameraManager: CameraManager;
    private readonly animationLoop: AnimationLoop;
    private readonly starField: StarField;
    private readonly galaxy: Galaxy;

    public readonly eventBus: EventBus;

    constructor(container: HTMLElement) {
        this.container = container;

        this.sceneManager = new SceneManager();
        this.renderer = new Renderer(container);
        this.cameraManager = new CameraManager();
        this.eventBus = new EventBus();

        this.starField = new StarField();
        this.sceneManager.scene.add(
            this.starField.points
        );

        this.galaxy = new Galaxy();

        this.sceneManager.scene.add(
            this.galaxy.group
        );

        this.animationLoop = new AnimationLoop(
            (deltaTime, elapsedTime) => {
                this.update(
                    deltaTime,
                    elapsedTime
                );

                this.render();
            }
        );

        this.handleResize();

        window.addEventListener(
            'resize',
            this.handleResize
        );
    }

    public start(): void {
        this.animationLoop.start();
    }

    public stop(): void {
        this.animationLoop.stop();
    }

    public destroy(): void {
        this.stop();

        window.removeEventListener(
            'resize',
            this.handleResize
        );

        this.sceneManager.scene.remove(
            this.starField.points
        );

        this.sceneManager.scene.remove(
            this.galaxy.group
        );

        this.galaxy.dispose();

        this.starField.dispose();

        this.eventBus.clear();

        this.renderer.dispose();
    }

    private update(
        deltaTime: number,
        elapsedTime: number
    ): void {
        void deltaTime;
        void elapsedTime;

        this.galaxy.update(
            deltaTime,
            elapsedTime
        );

        // Aquí actualizaremos:
        // galaxia
        // universos
        // partículas
        // animaciones
        // etc.
    }

    private render(): void {
        this.renderer.render(
            this.sceneManager.scene,
            this.cameraManager.camera
        );
    }

    private handleResize = (): void => {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        if (width === 0 || height === 0) {
            return;
        }

        this.cameraManager.resize(
            width,
            height
        );

        this.renderer.resize(
            width,
            height
        );
    };
}