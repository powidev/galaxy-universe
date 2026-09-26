import * as THREE from 'three';

import { ParticleTexture } from './ParticleTexture';

export class StarField {
    public readonly points: THREE.Points;

    private readonly geometry: THREE.BufferGeometry;
    private readonly material: THREE.PointsMaterial;
    private readonly texture: THREE.CanvasTexture;

    constructor(
        starCount = 5000,
        radius = 500
    ) {
        this.geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(
            starCount * 3
        );

        for (let i = 0; i < starCount; i++) {
            const index = i * 3;

            positions[index] =
                (Math.random() - 0.5) * radius * 2;

            positions[index + 1] =
                (Math.random() - 0.5) * radius * 2;

            positions[index + 2] =
                (Math.random() - 0.5) * radius * 2;
        }

        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        this.texture =
            ParticleTexture.create();

        this.material =
            new THREE.PointsMaterial({
                size: 1.5,
                sizeAttenuation: true,

                color: 0xffffff,

                transparent: true,
                opacity: 0.75,

                map: this.texture,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending,

                alphaTest: 0.01,
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