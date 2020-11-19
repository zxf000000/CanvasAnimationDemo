

var count = 0;

var sizes = [];
var values = []
var shouldStop = [];

let horizantalCount = 30;
let verticalCount = 30;
for (var i = 0; i < 50; i++) {
    sizes.push(10);
    values.push(1);
    shouldStop.push(true);
}

var startX = 0;
var startY = 0;

function draw() {
    if (count % 3 == 0) {
        var shouldChoose = true;
        const canvas = document.getElementById('test');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,1000,1000);
        var lastX = 30;
        var lastY = 30;

        let itemMaxWidth = 30;
        let itemMinWidth = 10;

        for (var i = 0; i < sizes.length; i ++) {
            if (sizes[i] == itemMaxWidth) {
                values[i] = -1;
                shouldStop[i] = true;
            }
            if (sizes[i] == itemMinWidth) {
                values[i] = 1;
                if (shouldStop[i] == true) {
                    values[i] = 0;
                }
            }
            console.log(shouldStop[i]);
            if (count >= i * 10) {
                sizes[i] += values[i];
            }
        }
        ctx.fillStyle = 'blue';
        ctx.beginPath()
        ctx.arc(startX * 30 + 30, startY * 30 + 30, 17, 0, Math.PI * 2, true)
        ctx.fill();


        for (var i = 0; i < verticalCount; i++) {
            for (var j = 0; j < horizantalCount; j++) {
                let currentLevel = Math.round(Math.sqrt((i - startY) * (i - startY) + (j - startX) * (j - startX)));
                let width = sizes[currentLevel];

                ctx.fillStyle = 'red';
                ctx.beginPath()
                ctx.arc(lastX, lastY, width/2, 0, Math.PI * 2, true)
                ctx.fill();

                lastX += itemMaxWidth;
            }
            lastY += itemMaxWidth;
            lastX = 30;
        }
    }
    var shouldChoose = true;
    for (var i = 0; i < shouldStop.length; i++) {
        if (shouldStop[i] != true) {
            shouldChoose = false;
        }
    }
    if (!shouldChoose) {
        requestAnimationFrame(draw);
        count += 1;
        shouldChoose = true;
    } else {
        for (var i = 0; i < shouldStop.length; i++) {
            shouldStop[i] = false;
            sizes[i] = 10;
            values[i] = 1;
        }
        startX = getRandomInt(horizantalCount);
        startY = getRandomInt(verticalCount);
        count = 0;
        shouldChoose = false;
        console.log("rechoose");
        requestAnimationFrame(draw);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

draw();