import { noise } from '../node_modules/@chriscourses/perlin-noise/index.js'
// import { randomIntFromRange, randomColor, distance } from './utils/utils.js';
// import { color3 } from './utils/colorArrays.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

class Circle {
    constructor(x, y, radius, color, offset) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.offset = offset;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.closePath();
        }

        this.update = () => {
            // this.y += 

            this.draw();
        }
    }
}

let circles;
function init() {
    circles = [];

    for (let i = 0; i < 100; i++) {
        circles.push(new Circle(canvas.width / 2, canvas.height / 2, 5, 'blue', i * 0.01));
    }
}

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.3)'
    c.fillRect(0, 0, canvas.width, canvas.height);


    circles.forEach(circle => {
        circle.update();
        circle.x = noise(time + circle.offset + 20) * canvas.width;
        circle.y = noise(time + circle.offset) * canvas.height;
    });

    time += 0.005;

    c.fillText('dattebayo', mouse.x, mouse.y)
    //call the object.update() method
}

init();
animate();