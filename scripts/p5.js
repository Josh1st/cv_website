const run_p5 = (selector, dark=false) => {

    let sketch = document.querySelector(selector);

    try {
        sketch.innerHTML = ''
    } catch (error) {
    }


    let p5_obj = new p5((p) => {
        let particles = [];
        const num = sketch.offsetWidth * sketch.offsetHeight * 0.00002;
        const noiseScale = 0.01 / 2;
        const speedMultiplier = 1; // Increase this value to make particles move faster

        p.setup = () => {
            p.createCanvas(sketch.offsetWidth, sketch.offsetHeight).parent(sketch);
            for (let i = 0; i < num; i++) {
                particles.push(p.createVector(p.random(p.width), p.random(p.height)));
            }
            if (dark) {
                p.stroke(255);
            } else {
                p.stroke(0);
            }
            
            p.strokeWeight(1);
            p.clear();
        };

        let counter = 0;
        let opacity = 10;
        p.draw = () => {

            if (counter > 10000) {
                if (counter % 2 == 0) {
                    opacity++;
                    console.log('adusting');
                }
                if (opacity > 255) {
                    counter = 0;
                    opacity = 10;
                }

            }

            if (dark) {
                p.background(0, opacity);
            } else {
                p.background(255, opacity);
            }
            

            particles.forEach((particle) => {
                // let colorValue = (p.noise(particle.x * noiseScale, particle.y * noiseScale) * 255);
                // p.stroke(colorValue, 100, 255 - colorValue, 100); // Change color dynamically
                p.point(particle.x, particle.y);

                // Move particles at a 45 degree angle
                let angle = p.PI / 4; // 45 degrees in radians
                particle.x += p.cos(angle) * speedMultiplier; // Move on x-axis
                particle.y += p.sin(angle) * speedMultiplier; // Move on y-axis

                // Check if the particle is off-screen and reset its position if needed
                if (!onScreen(particle, p)) {
                    particle.x = p.random(p.width);
                    particle.y = p.random(p.height);
                }
            });
            counter++
        };

        p.mouseReleased = () => {
            p.noiseSeed(p.millis());
        };

        function onScreen(v, p) {
            return v.x >= 0 && v.x <= p.width && v.y >= 0 && v.y <= p.height;
        }
    }, sketch);
    return p5_obj
}

export default run_p5