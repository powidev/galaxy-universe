import * as THREE from 'three';

export class SceneManager {
    public readonly scene: THREE.Scene;

    constructor() {
        this.scene = new THREE.Scene();
    }
}