// Inspired by: https://www.moeshop.jp/
import { useEffect, useRef } from 'react';

// Canvas can't use Tailwind classes, so read the theme.css variables directly.
function readThemeColor(name: string, fallback: string) {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
    return value || fallback;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Colors come from theme.css (read once, not every frame)
        const baseColor = readThemeColor('--color-bg-base', '#0e007c');
        const dotColor = readThemeColor('--color-bg-dots', '#002b90');

        let animationFrameId: number;

        let offset = 0;

        const handleResize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1: Draw the background fill
            ctx.fillStyle = baseColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ------ Changing Circles style ------ //
            // 2. Grid and Circle Parameters
            const spacing = 20;
            const maxRadius = 15;
            offset += 0.0075; // Speed of the wave

            ctx.fillStyle = dotColor;

            for (let x = spacing / 2; x < canvas.width + spacing; x += spacing) {
                for (let y = spacing / 2; y < canvas.height + spacing; y += spacing) {

                    // Simple, clean wave formula
                    const wave = Math.sin(offset + x * 0.02 + y * 0.02);

                    // Normalize wave from [-1, 1] to [0, 1] for the radius
                    const intensity = (wave + 1) / 2;
                    const radius = Math.max(1, intensity * maxRadius);

                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // ------ Changing Circles style ------ //


            // ------ Grid pattern style ------ //
            // // Step 2: Increment Motion Offset
            // const speed = 0.5; // Adjust speed for faster or slower motion
            // const gridSize = 40; // Spacing between grid lines / patterns
            // offset = (offset + speed) % gridSize; // Seamless modulo loop

            // // Step 3: Draw the grid pattern with motion
            // ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            // ctx.lineWidth = 2;
            // // Draw moving vertical lines
            // for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
            //     ctx.beginPath();
            //     ctx.moveTo(x + offset, 0);
            //     ctx.lineTo(x + offset, canvas.height);
            //     ctx.stroke();
            // }

            // //Draw moving horizontal lines
            // for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
            //     ctx.beginPath();
            //     ctx.moveTo(0, y + offset);
            //     ctx.lineTo(canvas.width, y + offset);
            //     ctx.stroke();
            // }
            // ------ Grid pattern style ------ //

            // Continue the animation loop
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // 3. Clean up listeners and frame loops on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0, // Temporarily change to 0 or 1 to test if it's hiding behind something!
                pointerEvents: 'none',
            }}
        />
    );
};

export default AnimatedBackground;
