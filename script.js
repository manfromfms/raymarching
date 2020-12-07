var canv = document.getElementById('canv');
var ctx = canv.getContext('2d');

var width = canv.width;
var height = canv.height;

var maxdist = width*1.2;
var facing = 0;
var scope = 180;
var angstep = 0.5;

var maxitter = 100;
var minstep = 0.05;

var forstep = 5;
var backstep = 2;

var maxfps = 60;
var maxlengthfps = 50;

var useminimap = false;
var minimapSize = 200;

var useCOScorrection = false;

var x_player = 400;
var y_player = 400;

var key37 = false;
var key38 = false;
var key39 = false;
var key40 = false;
var fpsArray = [];
var pastMillis = 0;

alert("Use arrows to rotate your camera and move");
maxfps = 1000 / maxfps;

setInterval(function () {
    facing = (facing + 360) % 360;

    if (key37) {
        facing -= 1;
    }

    if (key38) {
        var rad = Math.tan(facing * Math.PI / 180);

        var xch = Math.sqrt(Math.pow(forstep, 2) / (Math.pow(rad, 2) + 1));

        var ych = Math.sqrt(Math.pow(forstep * rad, 2) / (Math.pow(rad, 2) + 1));

        if (facing >= 0 && facing < 90) {
            x_player += xch;
            y_player += ych;
        } else if (facing >= 90 && facing < 180) {
            x_player -= xch;
            y_player += ych;
        } else if (facing >= 180 && facing < 270) {
            x_player -= xch;
            y_player -= ych;
        } else if (facing >= 270 && facing < 360) {
            x_player += xch;
            y_player -= ych;
        }
    }

    if (key39) {
        facing += 1;
    }

    if (key40) {
        var rad = Math.tan(facing * Math.PI / 180);

        var xch = Math.sqrt(Math.pow(backstep, 2) / (Math.pow(rad, 2) + 1));

        var ych = Math.sqrt(Math.pow(backstep * rad, 2) / (Math.pow(rad, 2) + 1));

        if (facing >= 0 && facing < 90) {
            x_player -= xch;
            y_player -= ych;
        } else if (facing >= 90 && facing < 180) {
            x_player += xch;
            y_player -= ych;
        } else if (facing >= 180 && facing < 270) {
            x_player += xch;
            y_player += ych;
        } else if (facing >= 270 && facing < 360) {
            x_player -= xch;
            y_player += ych;
        }
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0,0,width,height/2);
    calcWay(x_player, y_player, scope, facing);
    ctx.fillStyle = "green";
    ctx.fillRect(0,height/2,width,height/2);
    calcWay(x_player, y_player, scope, facing);

    /*
    if (useCOScorrection) {
        for (var i = 0; i < distance.length; i++) {
            ctx.strokeStyle = 'rgb(' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ')';
            ctx.lineWidth = Math.ceil(width / distance.length + 1);
            ctx.beginPath();
            ctx.moveTo(i / distance.length * width, height / 2);
            ctx.lineTo(i / distance.length * width, distance[i] / maxdist * height / 2 * Math.cos((scope / 2 - i * angstep) * Math.PI / 180));
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i / distance.length * width, height / 2);
            ctx.lineTo(i / distance.length * width, height - distance[i] / maxdist * height / 2 * Math.cos((scope / 2 - i * angstep) * Math.PI / 180));
            ctx.stroke();
        }
    } else {
        for (var i = 0; i < distance.length; i++) {
            ctx.strokeStyle = 'rgb(' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ',' + distance[i] / maxdist * 255 + ')';
            ctx.lineWidth = Math.ceil(width / distance.length + 1);
            ctx.beginPath();
            ctx.moveTo(i / distance.length * width, height / 2);
            ctx.lineTo(i / distance.length * width, distance[i] / maxdist * height / 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(i / distance.length * width, height / 2);
            ctx.lineTo(i / distance.length * width, height - distance[i] / maxdist * height / 2);
            ctx.stroke();
        }
    }

    if (useminimap) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, minimapSize, minimapSize);

        var kmx = minimapSize / width;
        var kmy = minimapSize / height;
        for (var i = 0; i < x_obj_pos.length; i++) {
            switch (type_obj) {
                case 0:
                    ctx.fillStyle = 'blue';
                    ctx.beginPath();
                    ctx.arc(x_obj_pos[i] * kmx, y_obj_pos[i] * kmy, size_obj1 * kmx, 0, Math.PI * 2, false);
                    ctx.fill();
                    break;

                case 1:
                    break;
            }
        }
    }

*/

    var date = new Date();
    var stateMillis = date.getMilliseconds() + date.getSeconds() * 1000;

    var fps = 1000 / (stateMillis - pastMillis);

    fpsArray.push(fps);

    if (fpsArray.length > maxlengthfps) {
        fpsArray.shift();
    }

    var sum = 0;
    for (var i = 0; i < fpsArray.length; i++) {
        sum += fpsArray[i];
    }
    sum = sum / fpsArray.length;

    document.title = "FPS: " + Math.floor(fps) + "; Last " + maxlengthfps + ": " + sum;

    pastMillis = stateMillis;
}, maxfps);
