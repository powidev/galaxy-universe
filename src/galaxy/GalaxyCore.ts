import * as THREE from 'three';

import { ParticleTexture } from './ParticleTexture';

export class GalaxyCore {
    public readonly points: THREE.Points;

    private readonly geometry: THREE.BufferGeometry;
    private readonly material: THREE.PointsMaterial;
    private readonly texture: THREE.CanvasTexture;

    constructor(particleCount = 3000) {
        this.geometry = new THREE.BufferGeometry();

        this.texture =
            ParticleTexture.create();

        const positions = new Float32Array(
            particleCount * 3
        );

        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            const radius =
                Math.pow(Math.random(), 2.5) * 30;

            const angle =
                Math.random() * Math.PI * 2;

            positions[index] =
                Math.cos(angle) * radius;

            positions[index + 1] =
                (Math.random() - 0.5) * 8;

            positions[index + 2] =
                Math.sin(angle) * radius;
        }

        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        this.material =
            new THREE.PointsMaterial({
                color: 0xfff1c1,
                size: 2,
                sizeAttenuation: true,
                transparent: true,
                opacity: 0.9,
            });

        this.points = new THREE.Points(
            this.geometry,
            this.material
        );
    }

    public dispose(): void {
        this.geometry.dispose();
        this.material.dispose();
        this.texture.dispose();
    }
}