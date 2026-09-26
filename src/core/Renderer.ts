import * as THREE from 'three';

export class Renderer {
    public readonly renderer: THREE.WebGLRenderer;

    constructor(container: HTMLElement) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        container.appendChild(this.renderer.domElement);
    }

    public resize(width: number, height: number): void {
        this.renderer.setSize(width, height, false);
    }

    public render(
        scene: THREE.Scene,
        camera: THREE.Camera
    ): void {
        this.renderer.render(scene, camera);
    }

    public dispose(): void {
        this.renderer.dispose();
        this.renderer.domElement.remove();
    }
}