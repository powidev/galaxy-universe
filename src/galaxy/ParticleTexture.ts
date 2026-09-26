import * as THREE from 'three';

export class ParticleTexture {
    public static create(): THREE.CanvasTexture {
        const size = 128;

        const canvas =
            document.createElement('canvas');

        canvas.width = size;
        canvas.height = size;

        const context =
            canvas.getContext('2d');

        if (!context) {
            throw new Error(
                'No se pudo crear el contexto 2D'
            );
        }

        const center = size / 2;

        const gradient =
            context.createRadialGradient(
                center,
                center,
                0,
                center,
                center,
                center
            );

        gradient.addColorStop(
            0,
            'rgba(255, 255, 255, 1)'
        );

        gradient.addColorStop(
            0.15,
            'rgba(255, 255, 255, 0.95)'
        );

        gradient.addColorStop(
            0.35,
            'rgba(255, 255, 255, 0.5)'
        );

        gradient.addColorStop(
            0.7,
            'rgba(255, 255, 255, 0.12)'
        );

        gradient.addColorStop(
            1,
            'rgba(255, 255, 255, 0)'
        );

        context.fillStyle = gradient;

        context.fillRect(
            0,
            0,
            size,
            size
        );

        const texture =
            new THREE.CanvasTexture(canvas);

        texture.needsUpdate = true;

        return texture;
    }
}