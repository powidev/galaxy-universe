import * as THREE from 'three';
import { GalaxyParticles } from './GalaxyParticles';
import { GalaxyCore } from './GalaxyCore';
import { Nebula } from './Nebula';

export class Galaxy {
    public readonly group: THREE.Group;

    private readonly particles: GalaxyParticles;
    private readonly core: GalaxyCore;
    private readonly nebula: Nebula;

    constructor() {
        this.group = new THREE.Group();

        this.particles =
            new GalaxyParticles();

        this.core =
            new GalaxyCore();

        this.nebula =
            new Nebula();

        this.group.add(
            this.particles.points
        );

        this.group.add(
            this.core.points
        );

        this.group.add(
            this.nebula.points
        );
    }

    public update(
        deltaTime: number,
        elapsedTime: number
    ): void {
        this.group.rotation.y =
            elapsedTime * 0.02;

        this.particles.points.rotation.y =
            deltaTime * 0.01;

        this.core.points.rotation.y =
            deltaTime * 0.005;

        this.nebula.points.rotation.y =
            deltaTime * 0.003;
    }

    public dispose(): void {
        this.particles.dispose();
        this.core.dispose();
        this.nebula.dispose();

        this.group.clear();
    }
}