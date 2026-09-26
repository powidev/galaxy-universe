import * as THREE from 'three';

export class CameraManager {
    public readonly camera: THREE.PerspectiveCamera;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(
            60,
            1,
            0.1,
            2000
        );

        this.camera.position.set(0, 80, 220);

        this.camera.lookAt(0, 0, 0);
    }

    public resize(width: number, height: number): void {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}