import * as THREE from 'three';

import { ParticleTexture } from './ParticleTexture';

export class Nebula {
    public readonly points: THREE.Points;

    private readonly geometry: THREE.BufferGeometry;
    private readonly material: THREE.PointsMaterial;
    private readonly texture: THREE.CanvasTexture;

    constructor(particleCount = 2500) {
        this.geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(
            particleCount * 3
        );

        const colors = new Float32Array(
            particleCount * 3
        );

        const purple = new THREE.Color(0x8b5cf6);
        const blue = new THREE.Color(0x4f8cff);
        const pink = new THREE.Color(0xff6bd6);

        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            const radius =
                Math.pow(Math.random(), 0.7) * 150;

            const angle =
                Math.random() * Math.PI * 2;

            const thickness =
                (Math.random() - 0.5) *
                (10 + radius * 0.08);

            positions[index] =
                Math.cos(angle) * radius;

            positions[index + 1] =
                thickness;

            positions[index + 2] =
                Math.sin(angle) * radius;

            const color =
                new THREE.Color();

            const random =
                Math.random();

            if (random < 0.33) {
                color.copy(purple);
            } else if (random < 0.66) {
                color.copy(blue);
            } else {
                color.copy(pink);
            }

            colors[index] =
                color.r;

            colors[index + 1] =
                color.g;

            colors[index + 2] =
                color.b;
        }

        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        this.geometry.setAttribute(
            'color',
            new THREE.BufferAttribute(
                colors,
                3
            )
        );

        this.texture =
            ParticleTexture.create();

        this.material =
            new THREE.PointsMaterial({
                size: 4,
                sizeAttenuation: true,
                vertexColors: true,
                transparent: true,
                opacity: 0.08,
                map: this.texture,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            });

        this.points =
            new THREE.Points(
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