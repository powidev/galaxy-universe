import * as THREE from 'three';

import { ParticleTexture } from './ParticleTexture';

export class GalaxyParticles {
    public readonly points: THREE.Points;

    private readonly geometry: THREE.BufferGeometry;
    private readonly material: THREE.PointsMaterial;
    private readonly texture: THREE.CanvasTexture;

    constructor(
        particleCount = 12000,
        radius = 180,
        arms = 5
    ) {
        this.geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(
            particleCount * 3
        );

        const colors = new Float32Array(
            particleCount * 3
        );

        const colorA = new THREE.Color(0xffffff);
        const colorB = new THREE.Color(0x8db8ff);
        const colorC = new THREE.Color(0xffc98b);

        for (let i = 0; i < particleCount; i++) {
            const index = i * 3;

            const distance =
                Math.pow(Math.random(), 0.65) * radius;

            const arm =
                i % arms;

            const armAngle =
                (arm / arms) *
                Math.PI *
                2;

            const spiralAngle =
                distance * 0.045;

            const angle =
                armAngle + spiralAngle;

            const spread =
                2 + distance * 0.025;

            const randomOffset =
                (Math.random() - 0.5) * spread;

            positions[index] =
                Math.cos(angle) *
                    distance +
                randomOffset;

            positions[index + 1] =
                (Math.random() - 0.5) *
                (3 + distance * 0.015);

            positions[index + 2] =
                Math.sin(angle) *
                    distance +
                randomOffset;

            const starColor =
                new THREE.Color();

            const random =
                Math.random();

            if (random < 0.15) {
                starColor.copy(colorC);
            } else if (random < 0.35) {
                starColor.copy(colorB);
            } else {
                starColor.copy(colorA);
            }

            colors[index] =
                starColor.r;

            colors[index + 1] =
                starColor.g;

            colors[index + 2] =
                starColor.b;
        }

        this.texture =
            ParticleTexture.create();

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

        this.material =
            new THREE.PointsMaterial({
                size: 1.8,
                sizeAttenuation: true,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,

                map: this.texture,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending,

                alphaTest: 0.01,
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